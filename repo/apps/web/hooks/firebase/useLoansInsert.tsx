import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Loan } from './interfaceLoans';

export function useInsertLoan() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  async function insertLoan(loan: Loan) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await addDoc(collection(db, 'loans'), loan);

      setSuccess(true);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }

  return { insertLoan, isLoading, error, success };
}
