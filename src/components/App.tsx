import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import TabsWithContent from './TabsWithContent';
import DialogViewer from './DialogViewer';
import { Button } from './ui/button';
import Results from './Results';
import { performAccessibilityCheck } from '../lib/accessibilityChecker';

type TabType = 'code' | 'url' | 'upload';
type ErrorMessages = Record<TabType, string>;

export default function App() {
  const [htmlCode, setHtmlCode] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({ code: '', url: '', upload: '' });
  const [activeTab, setActiveTab] = useState<TabType>('code');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [results, setResults] = useState<any>(null);

  const clearErrors = () => setErrorMessages({ code: '', url: '', upload: '' });

  const handleDisplayContent = async () => {
    clearErrors();
    try {
      let content = '';

      switch (activeTab) {
        case 'code':
          if (!htmlCode.trim()) throw new Error('Por favor, insira um código HTML válido.');
          content = htmlCode;
          break;

        case 'url':
          if (!url.trim() || !url.match(/^https?:\/\/.+/)) throw new Error('Por favor, insira uma URL válida.');
          const response = await fetch(url);
          if (!response.ok) throw new Error('Não foi possível acessar a URL fornecida.');
          content = await response.text();
          break;

        case 'upload':
          if (!file) throw new Error('Por favor, carregue um arquivo válido.');
          content = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsText(file);
          });
          break;

        default:
          throw new Error('Método de entrada inválido.');
      }

      // Perform Accessibility Check with Portuguese locale
      const report = await performAccessibilityCheck(content);
      
      // Display Report
      setResults(report);
      setIsDialogOpen(true);

    } catch (error) {
      setErrorMessages((prev) => ({
        ...prev,
        [activeTab]: error instanceof Error ? error.message : 'Erro inesperado.',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <h1 className="text-xl font-semibold text-gray-800">Analisador de Acessibilidade</h1>
          <p className="text-sm text-gray-600">
            Escolha um método de entrada para verificar os critérios de acessibilidade WCAG A e AA.
          </p>
        </CardHeader>
        <CardContent>
          <TabsWithContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            htmlCode={htmlCode}
            setHtmlCode={setHtmlCode}
            url={url}
            setUrl={setUrl}
            file={file}
            setFile={setFile}
            errorMessages={errorMessages}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleDisplayContent} className="w-full">
            Visualizar
          </Button>
        </CardFooter>
      </Card>
      <DialogViewer
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        content={<Results results={results} />}
      />
    </div>
  );
}