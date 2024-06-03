'use client';

import React, { useState } from 'react';
import MenuAppBar from '@/components/AppBar';
import RegistryDataGrid from '@/components/RegistryDataGrid';
import useDocuments from '@/hooks/useElastic';
import useSearchDocuments from '@/hooks/useSearch';

export default function Page(): JSX.Element {
  const [query, setQuery] = useState('');
  const { documents, loading: elasticLoading, error: elasticError } = useDocuments();
  const { results, loading: searchLoading, error: searchError } = useSearchDocuments(query, 0);

  const isSearching = query !== '';
  const rows = isSearching ? results : documents;

  const formattedRows = rows.map((doc, index) => ({
    id: doc._id,
    location: doc._source.location || `Library ${String.fromCharCode(65 + index)}`,
    title: doc._source.title,
    author: doc._source.author || `Author ${index + 1}`,
    publisher: doc._source.publisher || `Publisher ${index + 1}`,
    year: doc._source.year.toString(),
    city: doc._source.city || `City ${String.fromCharCode(65 + index)}`,
    country: doc._source.country || `Country ${String.fromCharCode(65 + index)}`,
  }));

  if ((isSearching && searchLoading) || (!isSearching && elasticLoading)) {
    return <div>Loading...</div>;
  }

  if ((isSearching && searchError) || (!isSearching && elasticError)) {
    return <div>Error: {isSearching ? searchError : elasticError}</div>;
  }

  return (
    <div>
      <MenuAppBar setQuery={setQuery} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
        <RegistryDataGrid rows={formattedRows} />
      </div>
    </div>
  );
}
