import { useState } from 'react';

interface Loan {
  document_id: string;
  user_id: string;
  expiration_date: string;
  state: string;
}

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
        throw new Error('Failed to insert loan');
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
