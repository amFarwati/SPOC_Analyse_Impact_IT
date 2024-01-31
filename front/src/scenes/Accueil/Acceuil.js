import React from "react";
import { Box, Typography, Slide, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import backgroundImage from "./fond3.jpg";

const Accueil = () => {
  const theme = useTheme();

  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid
        item
        height="30%"
        width="100%"
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          //filter: "blur(8px)",
          zIndex: -1,
        }}
      >
        <Box sx={{ p: 8, color: theme.palette.primary.main }}>
          <Slide direction="right" in={true} timeout={2000}>
            <Typography variant="h2" component="h1" gutterBottom>
              OPSIAN
            </Typography>
          </Slide>
          <Slide direction="right" in={true} timeout={3000}>
            <Typography variant="h6" component="h2" gutterBottom>
              Votre outil d'analyse d'impact du numérique
            </Typography>
          </Slide>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Accueil;
