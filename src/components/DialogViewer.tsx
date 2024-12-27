import { ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DialogViewerProps {
  isOpen: boolean;
  onClose: () => void;
  content: ReactNode; // Allow both strings and React elements
}

export default function DialogViewer({ isOpen, onClose, content }: DialogViewerProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-screen w-[600px] overflow-y-auto rounded-lg bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle>Conteúdo</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {typeof content === 'string' ? (
            <pre className="overflow-auto whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded-lg w-[445px] break-words">
              {content}
            </pre>
          ) : (
            content
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
