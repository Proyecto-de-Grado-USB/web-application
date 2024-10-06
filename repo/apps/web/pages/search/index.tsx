'use client';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import MenuAppBar from '@/components/AppBar';
import RegistryDataGrid from '@/components/RegistryDataGrid';
import useDocuments from '@/hooks/elastic/useElastic';
import useSearchDocuments from '@/hooks/elastic/useSearch';
import useSemanticSearch from '@/hooks/elastic/useSemantic';
import { SxProps } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const BackgroundImage = () => {
  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url("sales.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
      }}
    />,
    document.body
  );
};

const gridStyles: SxProps = {
  height: 'calc(100vh - 200px)',
  width: '95%',
  mt: '120px',
};

export default function Page(): JSX.Element {
  const [query, setQuery] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('searchQuery') || '';
    }
    return '';
  });

  const [useSemantic, setUseSemantic] = useState(true);

  useEffect(() => {
    if (query) {
      sessionStorage.setItem('searchQuery', query);
    }
  }, [query]);

  const { documents, loading: elasticLoading, error: elasticError } = useDocuments();
  const { results: searchResults, loading: searchLoading, error: searchError } = useSearchDocuments(query, 0);
  const { results: semanticResults, loading: semanticLoading, error: semanticError } = useSemanticSearch(query, 0);

  const isSearching = query !== '';
  const rows = isSearching ? (useSemantic ? semanticResults : searchResults) : documents;

  const formattedRows = rows.map((doc, index) => ({
    id: doc._id,
    location: doc._source.location || `Library ${String.fromCharCode(65 + index)}`,
    title: doc._source.title,
    author: doc._source.author || `Author ${index + 1}`,
    publisher: doc._source.publisher || `Publisher ${index + 1}`,
    year: doc._source.year ? doc._source.year.toString() : 's.f.',
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
    property: doc._source.property || `Properties ${index + 1}`,
  }));

  if ((isSearching && (searchLoading || semanticLoading)) || (!isSearching && elasticLoading)) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if ((isSearching && (searchError || semanticError)) || (!isSearching && elasticError)) {
    return <div>Error: {isSearching ? (searchError || semanticError) : elasticError}</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Búsqueda de Documentos</title>
      </Helmet>
      <MenuAppBar setQuery={setQuery} useSemantic={useSemantic} setUseSemantic={setUseSemantic} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <RegistryDataGrid rows={formattedRows} sx={gridStyles} isSearch={true} />
      </div>
      <BackgroundImage />
    </div>
  );
}
