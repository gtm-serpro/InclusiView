import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import ErrorAlert from './ErrorAlert';
import FileUploader from './FileUploader';

type TabType = 'code' | 'url' | 'upload';

interface TabsWithContentProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  htmlCode: string;
  setHtmlCode: (value: string) => void;
  url: string;
  setUrl: (value: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  errorMessages: Record<TabType, string>;
}

export default function TabsWithContent({
  setActiveTab,
  htmlCode,
  setHtmlCode,
  url,
  setUrl,
  file,
  setFile,
  errorMessages,
}: TabsWithContentProps) {
  return (
    <Tabs defaultValue="code" onValueChange={(value) => setActiveTab(value as TabType)}>
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
        {errorMessages.code && <ErrorAlert message={errorMessages.code} />}
      </TabsContent>
      <TabsContent value="url">
        <input
          type="text"
          placeholder="Insira uma URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
        />
        {errorMessages.url && <ErrorAlert message={errorMessages.url} />}
      </TabsContent>
      <TabsContent value="upload">
        <FileUploader file={file} setFile={setFile} />
        {errorMessages.upload && <ErrorAlert message={errorMessages.upload} />}
      </TabsContent>
    </Tabs>
  );
}
