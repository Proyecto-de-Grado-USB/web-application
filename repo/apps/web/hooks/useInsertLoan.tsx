import { useState } from 'react';
import { Loan } from './loanInterface';

export function useInsertLoan() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  async function insertLoan(loan: Loan) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loan),
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

  return { insertLoan, isLoading, error, success };
}
