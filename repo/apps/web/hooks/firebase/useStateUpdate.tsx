import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export function useUpdateState() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  async function updateState(loanId: string, newState: string) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const loanDocRef = doc(db, 'loans', loanId);

      await updateDoc(loanDocRef, {
        state: newState
      });

      setSuccess(true);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }

  return { updateState, isLoading, error, success };
}
