import { useState } from 'react';

interface UseUpdateHook {
  updateDocument: (id: string, data: any) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const useUpdate = (): UseUpdateHook => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateDocument = async (id: string, data: any): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/document/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update the document.');
      }

      await response.json();
    } catch (error: any) {
        setError(error.message || 'An unknown error occurred during the update.');
    } finally {
      setIsLoading(false);
    }
  };

  return { updateDocument, isLoading, error };
};

export default useUpdate;
