import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import ChecklistIcon from '@mui/icons-material/Checklist';
import {Link} from "react-router-dom"


function Topbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2} mb="100px">
      {/* Search Bar */}
      <Box
        display="flex"
        borderRadius="3px"
      >
      
        <Box >
          
          <Typography variant="h1" color={colors.grey[100]} fontWeight="bold" sx={{mb:"5px"}}> OPSIAN</Typography>
          <Typography variant="h5" color={colors.greenAccent[100]}>OpenSource Impact ANalazyer </Typography>
        </Box>
      </Box>

      <List
      sx={{ width: '100%', maxWidth: 360 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AutoAwesomeMotionIcon />
        </ListItemIcon>
        <ListItemText >
          <Typography variant="h3" fontWeight="600" color={colors.grey[100]} >Aller à</Typography>
        </ListItemText>

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleClick} component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText >
              <Typography variant="h7" fontWeight="600" color={colors.grey[100]} >Home</Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={handleClick} component={Link} to="/selection">
            <ListItemIcon>
              <ChecklistIcon />
            </ListItemIcon>
            <ListItemText >
              <Typography variant="h7" fontWeight="600" color={colors.grey[100]} >Item selection</Typography>
            </ListItemText>
            <Link to="/selection" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>

      {/* ICONS */}
      <Box display="flex">
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
