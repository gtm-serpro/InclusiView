import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function App() {
  const [htmlCode, setHtmlCode] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleAnalyze = () => {
    if (htmlCode) {
      console.log('Código HTML para análise:', htmlCode);
    } else if (url) {
      console.log('URL para análise:', url);
    } else if (file) {
      console.log('Arquivo para análise:', file);
    } else {
      console.log('Nenhuma entrada fornecida para análise.');
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
          <Tabs defaultValue="code">
            <TabsList className="mb-4">
              <TabsTrigger value="code">Código</TabsTrigger>
              <TabsTrigger value="url">URL</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
            </TabsList>

            <TabsContent value="code">
              <Textarea
                placeholder="Cole o código HTML aqui..."
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="min-h-[150px]"
              />
            </TabsContent>

            <TabsContent value="url">
              <input
                type="text"
                placeholder="Insira uma URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </TabsContent>

            <TabsContent value="upload">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {file && <p className="text-sm text-gray-600 mt-2">Arquivo selecionado: {file.name}</p>}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleAnalyze}
            className="w-full"
          >
            Analisar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
