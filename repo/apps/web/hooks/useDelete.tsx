import { useState } from 'react';

interface UseDeleteHook {
  deleteDocument: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const useDelete = (): UseDeleteHook => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteDocument = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/document/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete the document.');
      }

      await response.json();
    } catch (error: any) {
      setError(error.message || 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteDocument, isLoading, error };
};

export default useDelete;
