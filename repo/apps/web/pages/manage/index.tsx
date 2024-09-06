'use client';

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import RegistryDataGrid from '@/components/RegistryDataGrid';
import AppBarWithDrawer from '@/components/AppBarWithDrawer';
import useDocuments from '@/hooks/elastic/useElastic';
import useSearchDocuments from '@/hooks/elastic/useSearch';
import useInsert from '@/hooks/elastic/useInsert';
import { Box, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { SxProps } from '@mui/system';
import UpdateDocumentDialog from '@/components/UpdateDocumentDialog';

const defaultTheme = createTheme();

const gridStyles: SxProps = {
  height: 'calc(100vh - 500px)', 
  width: '80%', 
  mt: '10px', 
};

export default function Page(): JSX.Element {
  const [query, setQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { documents, loading: elasticLoading, error: elasticError } = useDocuments();
  const { results, loading: searchLoading, error: searchError } = useSearchDocuments(query, 0);
  const { insertDocument } = useInsert();

  const isSearching = query !== '';
  const rows = isSearching ? results : documents;

  const formattedRows = rows.map((doc, index) => ({
    id: doc._id,
    location: doc._source.location || `Library ${String.fromCharCode(65 + index)}`,
    title: doc._source.title,
    author: doc._source.author || `Author ${index + 1}`,
    publisher: doc._source.publisher || `Publisher ${index + 1}`,
    year: doc._source.year ? doc._source.year.toString() : `Year ${2000 + index}`,
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

  const handleAddDocumentClick = () => {
    setSelectedRow(null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleInsertDocument = async (document) => {
    try {
      await insertDocument(document);
      alert('Se añadió el documento.');
    } catch (error) {
      console.error('Error adding document:', error);
      alert('No se pudo añadir el documento.');
    }
  };

  if ((isSearching && searchLoading) || (!isSearching && elasticLoading)) {
    return <div>Loading...</div>;
  }

  if ((isSearching && searchError) || (!isSearching && elasticError)) {
    return <div>Error: {isSearching ? searchError : elasticError}</div>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900], }}>
        <CssBaseline />
        <AppBarWithDrawer title={"Gestionar Documentos"}/>
        <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}>
          <Helmet>
            <title>Gestión de Documentos</title>
          </Helmet>
          <Button variant="contained" onClick={handleAddDocumentClick} sx={{ml: '175px', mt: '100px'}}>Agregar</Button>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <RegistryDataGrid rows={formattedRows} sx={gridStyles} isSearch={false}/>
          </div>
        </Box>
      </Box>
      <UpdateDocumentDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        selectedRow={selectedRow}
        onInsert={handleInsertDocument}
      />
    </ThemeProvider>
  );
}
