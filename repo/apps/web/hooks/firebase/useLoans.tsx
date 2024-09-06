import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Loan } from './interfaceLoans';

export function useLoans() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLoans() {
      setIsLoading(true);
      setError(null);
      try {
        const querySnapshot = await getDocs(collection(db, 'loans'));
        const loansData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          
          return {
            id: doc.id,
            document_id: data.document_id || '',
            user_id: data.user_id || '',
            expiration_date: data.expiration_date || '',
            state: data.state || 'standby',
            user_name: data.user_name || '',
            phone: data.phone || '',
            email: data.email || '',
            teacher: data.teacher || '',
            career: data.career || '',
            reg_univ: data.reg_univ || '',
          } as Loan;
        });

        setLoans(loansData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLoans();
  }, []);

  return { loans, isLoading, error };
}
