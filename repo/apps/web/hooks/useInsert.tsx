import { useState } from 'react';

const useInsert = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [response, setResponse] = useState(null);

    const insertDocument = async (document: any) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/document', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(document)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setResponse(result);
            setIsLoading(false);
            return result;
        } catch (error: any) {
            setError(error);
            setIsLoading(false);
            throw error;
        }
    };

    return { insertDocument, isLoading, error, response };
};

export default useInsert;
