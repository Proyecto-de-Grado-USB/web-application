'use client';

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import MenuAppBar from '@/components/AppBar';
import RegistryDataGrid from '@/components/RegistryDataGrid';
import useDocuments from '@/hooks/useElastic';
import useSearchDocuments from '@/hooks/useSearch';
import { SxProps } from '@mui/system';

const gridStyles: SxProps = {
  height: 'calc(100vh - 100px)', 
  width: '98%', 
  mt: '80px', 
};

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
    edition: doc._source.edition || `Edition ${index + 1}`,
    format: doc._source.format || `Format ${index + 1}`,
    isbn: doc._source.isbn || `ISBN ${index + 1}`,
    language: doc._source.language || `Language ${index + 1}`,
    pages: doc._source.pages || 100 + index,
    dimensions: doc._source.dimensions || `Dimensions ${index + 1}`,
    subject: doc._source.subject || `Subject ${index + 1}`,
    notes: doc._source.notes || `Notes ${index + 1}`,
  }));

  if ((isSearching && searchLoading) || (!isSearching && elasticLoading)) {
    return <div>Loading...</div>;
  }

  if ((isSearching && searchError) || (!isSearching && elasticError)) {
    return <div>Error: {isSearching ? searchError : elasticError}</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Búsqueda de Documentos</title>
      </Helmet>
      <MenuAppBar setQuery={setQuery} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <RegistryDataGrid rows={formattedRows} sx={gridStyles} isSearch={true}/>
      </div>
    </div>
  );
}
