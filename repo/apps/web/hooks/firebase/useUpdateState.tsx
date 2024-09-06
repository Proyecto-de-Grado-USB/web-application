import { useState } from 'react';

export function useUpdateState() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  async function updateState(loanId: number, newState: string) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/loans', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loanId, newState }),
      });

      if (!response.ok) {
        throw new Error('No se pudo completar la solicitud.');
      }

      setSuccess(true);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }

  return { updateState, isLoading, error, success };
}
