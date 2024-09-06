import { useState, useEffect } from 'react';
import { ErrorResponse, SearchResponse, Document } from './interfaceDocs';

const useDocuments = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await fetch('http://localhost:3000');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: SearchResponse = await response.json();
                setDocuments(data.documents);
            } catch (error) {
                const err = error as ErrorResponse;
                setError(err.message || 'Error fetching documents');
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    return { documents, loading, error };
};

export default useDocuments;
