import React from "react";
import { Box, Typography, Grow, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import backgroundImage from "./fond3.jpg";
import Maxime from "../../Assets/Maxime.jpg"
import Arthur from "../../Assets/Arthur.jpg"
import HBC from "../../Assets/HBC.jpg"
import Insa from "../../Assets/INSA.png"
import Ruche from "../../Assets/Ruche.png"


const Accueil = () => {
  const theme = useTheme();

  return (
    <Grid container style={{ minHeight: "80vh" }}>
      <Grid
        item
        width="100%"
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center", // Center the background image
          //filter: "blur(8px)",
          zIndex: -1,
        }}
      >
        <Box sx={{ p: 8, color: "#000000", textAlign: "center" }}>
          <Grow direction="right" in={true} timeout={2000}>
            <Typography variant="h2" component="h1" gutterBottom style={{ fontSize: "3rem", fontWeight: "bold" }}>
              OPSIAN
            </Typography>
          </Grow>
          <Grow direction="right" in={true} timeout={2000}>
            <Typography variant="h6" component="h2" gutterBottom style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            OPen Source Impact ANalyzer, est une solution d'analyse d'impact IT qui permet aux utilisateurs d'avoir une idée de leur impact environnemental concernant leur parc informatique.


            </Typography>
          </Grow>
          <Box
            sx={{
              mt: 4,
              p: 2,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: "none",
              borderRadius: "4px"
            }}
          >
            <Typography variant="h4" component="h3" gutterBottom style={{ fontSize: "2rem", fontWeight: "bold" }}>
              À propos
            </Typography>
            <Typography variant="body1" gutterBottom>
            Nous sommes deux étudiants de l'INSA Lyon, spécialité Télécommunications Services & usages. Pendant nos études, avons pu faire un projet en partenariat avec une entreprise pour concevoir une Sustainable Proof Of Concept ou SPOC.
            C'est Hugues Benoit-Cattin, notre référent à l'INSA et à La Ruche Industrielle, qui nous a présenté les objectifs que devait atteindre notre analyseur d'impact informatique.            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
            <Box sx={{ marginRight: "1rem" }}>
              <img src={Maxime} alt="Image 1" style={{ height: "200px" }} />
              <Typography sx={{
              mt: 4,
              p: 2,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: "none",
              borderRadius: "4px"
            }}
            variant="body2" gutterBottom>
                Maxime Herry - Développeur
              </Typography>
            </Box>
            <Box sx={{ marginRight: "1rem" }}>
              <img src={Arthur} alt="Image 2" style={{  height: "200px" }} />
              <Typography sx={{
              mt: 4,
              p: 2,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: "none",
              borderRadius: "4px"
            }}
             variant="body2" gutterBottom>
                Arthur-Mustapha Farwati - Développeur
              </Typography>
            </Box>
            <Box>
              <img src={HBC} alt="Image 3" style={{height: "200px" }} />
              <Typography sx={{
              mt: 4,
              p: 2,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: "none",
              borderRadius: "4px"
            }}
            variant="body2" gutterBottom>
                Hugues Benoit-Cattin - Référent
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Accueil;

