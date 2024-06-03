import { useState, useEffect } from 'react';

interface DocumentSource {
    id: number;
    location: string;
    title: string;
    author: string;
    publisher: string;
    year: number;
    city: string;
    country: string;
}

interface DocumentResult {
    _index: string;
    _id: string;
    _score: number;
    _source: DocumentSource;
}

interface SearchResponse {
    results: DocumentResult[];
    query: string;
    from: number;
    total: number;
}

interface ErrorResponse {
    message: string;
}

const useSearchDocuments = (query: string, from: number) => {
    const [results, setResults] = useState<DocumentResult[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await fetch('http://localhost:3000/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        query: query,
                        from_: from.toString()
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data: SearchResponse = await response.json();
                setResults(data.results);
            } catch (error) {
                const err = error as ErrorResponse;
                setError(err.message || 'Error fetching search results');
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query, from]);

    return { results, loading, error };
};

export default useSearchDocuments;
