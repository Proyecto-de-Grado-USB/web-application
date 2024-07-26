import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import Card from "./MetricsCard";
import Orders from "./Orders";
import { Helmet } from "react-helmet";
import AppBarWithDrawer from "@/components/AppBarWithDrawer";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

const defaultTheme = createTheme();

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Derechos de Autor © "}
      <Link color="inherit" href="http://crai.usalesiana.edu.bo/">
        Universidad Salesiana de Bolivia
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Panel Administrativo</title>
      </Helmet>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBarWithDrawer title={"Panel Administrativo"}/>
          <Box component="main" sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Container maxWidth="lg" sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 240 }}>
                    <Chart />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 240 }}>
                    <Card />
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                    <Orders />
                  </Paper>
                </Grid>
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
