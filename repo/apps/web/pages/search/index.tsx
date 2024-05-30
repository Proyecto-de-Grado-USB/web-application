'use client';

import React from 'react';
import MenuAppBar from '@/components/AppBar';
import RegistryDataGrid from '@/components/RegistryDataGrid';
import useDocuments from '@/hooks/useElastic';

export default function Page(): JSX.Element {
  const { documents, loading, error } = useDocuments();

  const rows = documents.map((doc, index) => ({
    id: doc._id,
    location: doc._source.location || `Library ${String.fromCharCode(65 + index)}`,
    title: doc._source.title,
    author: doc._source.author || `Author ${index + 1}`,
    publisher: doc._source.publisher || `Publisher ${index + 1}`,
    year: doc._source.year || `20${String(20 - index).padStart(2, '0')}`,
    city: doc._source.city || `City ${String.fromCharCode(65 + index)}`,
    country: doc._source.country || `Country ${String.fromCharCode(65 + index)}`,
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <MenuAppBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
        <RegistryDataGrid rows={rows} />
      </div>
    </div>
  );
}
