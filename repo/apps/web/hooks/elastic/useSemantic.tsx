import { useState, useEffect } from 'react';

interface SearchResult {
  _id: string;
  _source: any;
  _score: number;
}

interface SearchResponse {
  results: SearchResult[];
  query: string;
  from: number;
  total: number;
}

interface ErrorResponse {
  message: string;
}

const useSemanticSearch = (query: string, from: number = 0) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:3000/semantic-search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query, from_: from }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: SearchResponse = await response.json();

        setResults(data.results);
      } catch (error) {
        const err = error as ErrorResponse;
        setError(err.message || 'Error performing search');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query, from]);
  
  return { results, loading, error };
};

export default useSemanticSearch;
