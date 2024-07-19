'use client';

import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, CssBaseline, ThemeProvider, createTheme, Grid } from '@mui/material';
import AppBarWithDrawer from '@/components/AppBarWithDrawer';
import CustomCard from '@/components/CustomCard';

const defaultTheme = createTheme();

const cardData = [
  { title: 'Card Title 1', content: 'Card Content 1', actionText: 'Action 1' },
  { title: 'Card Title 2', content: 'Card Content 2', actionText: 'Action 2' },
  { title: 'Card Title 3', content: 'Card Content 3', actionText: 'Action 3' },
  { title: 'Card Title 4', content: 'Card Content 4', actionText: 'Action 4' },
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
                <CustomCard title={card.title} content={card.content} actionText={card.actionText} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
