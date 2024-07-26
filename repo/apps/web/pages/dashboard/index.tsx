import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import Card from "./MetricsCard";
import { Helmet } from "react-helmet";
import AppBarWithDrawer from "@/components/AppBarWithDrawer";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import LoansPieChart from "@/components/LoansPieChart";

const defaultTheme = createTheme();

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Panel Administrativo</title>
      </Helmet>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBarWithDrawer title={"Panel Administrativo"} />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Container
              maxWidth="lg"
              sx={{ my: 4, display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                  <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 240 }}>
                    <Chart />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 240 }}>
                    <Card title="Documentos Añadidos" activityType="insert" />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 240 }}>
                    <Card title="Documentos Eliminados" activityType="delete" />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 240 }}>
                    <Card title="Documentos Actualizados" activityType="modify" />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 300 }}>
                    <LoansPieChart />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
