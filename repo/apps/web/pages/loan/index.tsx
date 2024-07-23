'use client';

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AppBarWithDrawer from '@/components/AppBarWithDrawer';
import LoanTable from '@/components/LoanTable';

const defaultTheme = createTheme();

export default function Page(): JSX.Element {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900], }}>
        <CssBaseline />
        <AppBarWithDrawer title={"Préstamo de Documentos"}/>
        <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}>
          <Helmet>
            <title>Préstamo de Documentos</title>
          </Helmet>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <LoanTable/>
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
