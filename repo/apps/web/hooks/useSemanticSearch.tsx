import { useState, useEffect } from 'react';

interface SearchResult {
  _id: string;
  _source: any;
  [key: string]: any;
}

interface UseSemanticSearchResult {
  results: SearchResult[];
  query: string;
  from: number;
  total: number;
  loading: boolean;
  error: string | null;
  search: (query: string, from?: number) => void;
}

const useSemanticSearch = (): UseSemanticSearchResult => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState<string>('');
  const [from, setFrom] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string, from: number = 0) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/semantic-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, from_: from })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("data", data)

      setResults(data.results);
      setQuery(data.query);
      setFrom(data.from);
      setTotal(data.total);
    } catch (err) {
      setError('Error performing search');
      console.error('Error performing semantic search:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  }, []);

  return { results, query, from, total, loading, error, search };
};

export default useSemanticSearch;
