import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import logo_INSA from "./logo_INSA.png";
import logo_RUCHE from "./logo_RUCHE.png";

import * as React from "react";

function Topbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2} mb="18px">
      {/* Search Bar */}
      <Box display="flex" borderRadius="3px">
        <Box>
          <Typography
            variant="h1"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            {" "}
            OPSIAN
          </Typography>
          <Typography variant="h5" color={colors.greenAccent[400]}>
            OpenSource Impact ANalazyer{" "}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" ml={5} width={300}>
          <Box sx={{ width: "65%" }}>
            <img width="100%" src={logo_INSA} />
          </Box>
          <Box sx={{ width: "35%" }}>
            <img width="100%" src={logo_RUCHE} />
          </Box>
        </Box>
      </Box>

      {/* ICONS */}
      <Box display="flex" justifyContent="center" alignItems="center">
        {/* Aligner à droite */}
        <Box sx={{ marginLeft: "auto" }}>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <DownloadOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton>
            <PersonOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Topbar;
