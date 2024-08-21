'use client';

import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NextLink from 'next/link';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mb: 2, mt: 2 }}
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

export default function SignInSide() {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={8}
        sx={{
          backgroundImage:
            "url(https://df5kbf1hky40.cloudfront.net/media/cache/3d/63/3d63f2c2375ebd74e9c402f142e848a0.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            px: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="https://yt3.ggpht.com/a/AATXAJzGIpn234_LYi-ZxPBp9xMV8SOqMRAsE36L0Q=s900-c-k-c0xffffffff-no-rj-mo"
            alt="Welcome"
            style={{
              width: "15%",
              height: "auto",
              maxWidth: "400px",
              marginBottom: "16px",
            }}
          />
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', fontSize: "2rem" }}>
            Bienvenido
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2, width: 400, fontSize: "1.2rem" }}>
            En el catálogo de la biblioteca de la Sede Académica de Cochabamba, encontrarás libros, revistas, tesis, proyectos de grado y demás para potenciar tu aprendizaje.
          </Typography>
          <NextLink href="/search" passHref>
            <Button variant="contained" sx={{ mt: 3, mb: 2, width: 400, backgroundColor: '#0d468f' }}>
              Empezar
            </Button>
          </NextLink>
          <Copyright />
          <img
            src="https://df5kbf1hky40.cloudfront.net/media/cache/80/b5/80b5493849bdbc392316e766cc6ce8b1.png"
            alt="Welcome"
          />
        </Box>
      </Grid>
    </Grid>
  );
}
