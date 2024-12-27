import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <Alert variant="destructive" className="mt-4">
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
