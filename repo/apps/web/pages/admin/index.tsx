'use client';

import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, CssBaseline, ThemeProvider, createTheme, Grid, Paper, Typography } from '@mui/material';
import AppBarWithDrawer from '@/components/AppBarWithDrawer';
import CustomCard from '@/components/CustomCard';
import BookIcon from '@mui/icons-material/Book';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { useLoans } from '@/hooks/useLoans';
import useDocuments from '@/hooks/useElastic';
import ActivitiesTable from '@/components/ActivityTable';

const defaultTheme = createTheme();

export default function Page(): JSX.Element {
  const { loans, isLoading: loansLoading, error: loansError } = useLoans();
  const { documents, loading: documentsLoading, error: documentsError } = useDocuments();

  const pendingLoansCount = loans.filter((loan) => loan.state === 'pending').length;
  const completedLoansCount = loans.filter((loan) => loan.state === 'completed').length;

  const cardData = [
    { title: 'Total de Libros', content: documentsLoading ? '0' : documents.length.toString(), icon: <BookIcon /> },
    // { title: 'Cantidad de Lectores', content: '0', icon: <PeopleIcon /> },
    { title: 'Préstamos Registrados', content: loansLoading ? '0' : completedLoansCount.toString(), icon: <PlaylistAddCheckIcon /> },
    { title: 'Préstamos Pendientes', content: loansLoading ? '0' : pendingLoansCount.toString(), icon: <FormatListNumberedIcon /> },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900], }}>
        <CssBaseline />
        <AppBarWithDrawer title={"Biblioteca USB"}/>
        <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', p: 8, mt: '50px' }}>
          <Helmet>
            <title>Administración de la Biblioteca</title>
          </Helmet>
          <Grid container spacing={3}>
            {cardData.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CustomCard title={card.title} content={card.content} icon={card.icon}/>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4 }}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" gutterBottom>
                Registro de Actividades
              </Typography>
              <ActivitiesTable />
            </Paper>
          </Box>

        </Box>
      </Box>
    </ThemeProvider>
  );
}
