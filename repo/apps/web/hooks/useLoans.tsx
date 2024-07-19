import { useState, useEffect } from 'react';
import { getAllLoans } from '../app/lib/data';

interface Loan {
  document_id: string;
  user_id: string;
  expiration_date: string;
  status: string;
}

export function useLoans() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchLoans() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAllLoans();
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
