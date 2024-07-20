'use client';

import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, CssBaseline, ThemeProvider, createTheme, Grid } from '@mui/material';
import AppBarWithDrawer from '@/components/AppBarWithDrawer';
import CustomCard from '@/components/CustomCard';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const defaultTheme = createTheme();

const cardData = [
  { title: 'Total de Libros', content: '0', icon: <BookIcon /> },
  { title: 'Cantidad de Lectores', content: '0', icon: <PeopleIcon /> },
  { title: 'Préstamos Registrados', content: '0', icon: <PlaylistAddCheckIcon /> },
  { title: 'Préstamos Pendientes', content: '0', icon: <FormatListNumberedIcon /> },
];

export default function Page(): JSX.Element {

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
        </Box>
      </Box>
    </ThemeProvider>
  );
}
