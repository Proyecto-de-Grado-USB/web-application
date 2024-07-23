import { useState, useEffect } from 'react';
import { Loan } from './loanInterface';

export function useLoans() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchLoans() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/loans');
        if (!response.ok) {
          throw new Error('Failed to fetch loans');
        }
        const data = await response.json();
        setLoans(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLoans();
  }, []);

  return { loans, isLoading, error };
}
