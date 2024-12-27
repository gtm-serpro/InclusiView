import { Button } from '@/components/ui/button';

interface FileUploaderProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export default function FileUploader({ file, setFile }: FileUploaderProps) {
  return (
    <div>
      <label htmlFor="file-upload" className="w-full">
        <Button variant="outline" asChild className="w-full">
          <span>{file ? `Trocar arquivo: ${file.name}` : 'Escolher arquivo'}</span>
        </Button>
        <input
          id="file-upload"
          type="file"
          accept=".html,.htm"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
        />
      </label>
      {file && (
        <p className="text-sm text-gray-600 mt-2">
          Arquivo selecionado: <strong>{file.name}</strong>
        </p>
      )}
    </div>
  );
}
