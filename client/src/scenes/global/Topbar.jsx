import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import logo_INSA from "./logo_INSA.png";
import logo_RUCHE from "./logo_RUCHE.png";
import './Topbar.css';

import * as React from "react";

function Topbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <div className='container'>
      {/* Search Bar */}
      <div className='left'>
        <Box>
          <Typography
            variant="h1"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            OPSIAN
          </Typography>
          <Typography variant="h5" color={colors.greenAccent[400]}>
            OpenSource Impact ANalazyer{" "}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" ml={5} width={300}>
          <Box width= "65%">
            <img width="100%" alt="logo de l'insa Lyon" src={logo_INSA} />
          </Box>
          <Box width= "35%" >
            <img
              width="100%"
              alt=" logo de la Ruche Industrielle"
              src={logo_RUCHE}
            />
          </Box>
        </Box>
      </div>

      {/* ICONS */}
      <div className='right'>
        {/* Aligner à droite */}
        <Box sx={{ marginLeft: "auto" }}>
          <IconButton
            title="Mode sombre/jour"
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton
            href="./Templates_prepares.zip"
            download
            title="Téléchargement de templates préparés"
          >
            <DownloadOutlinedIcon />
          </IconButton>
        </Box>
      </div>
    </div>
  );
}

export default Topbar;
