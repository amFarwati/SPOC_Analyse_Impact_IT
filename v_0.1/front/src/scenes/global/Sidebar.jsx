import { useState } from "react";
import { ProSidebar,Menu,MenuItem} from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import {Box,IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import {tokens } from "../../theme";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import DashboardIcon from '@mui/icons-material/Speed';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Skeleton from '@mui/material/Skeleton';
import IsoOutlinedIcon from '@mui/icons-material/IsoOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


const Item = ({ title, to, icon, selected, setSelected }) =>{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return(
    <MenuItem active={selected === title} style={{ color:colors.grey[100]}} onClick={()=>setSelected(title)} icon={icon}>
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  )
}


function Sidebar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed,setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
      <Box
        sx={{
          "& .pro-sidebar-inner":{
            background: `${colors.primary[400]} !important`
          },
          "& .pro-icon-wrapper":{
            background: "transparent !important"
          },
          "& .pro-inner-item":{
            padding: "5px 35px 5px 20px"
          },
          "& .pro-inner-item:hover":{
            color: "#868dfb !important"
          },
          "& .pro-menu-item.active":{
            color: "#6870fa !important"
          },
        }}
      >
        <ProSidebar collapsed = {isCollapsed}>
          <Menu iconShape='square'>

            {/* LOGO AND MENU ICON*/}
            <MenuItem
              onClick={()=> setIsCollapsed(!isCollapsed)}
              icon={isCollapsed?<MenuOutlinedIcon/>:undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
              >
              {!isCollapsed && (
                <Box 
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.grey[100]}>ADMINIS</Typography>
                  <IconButton onClick={()=>setIsCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon/>
                  </IconButton>
                </Box>
              )}
            </MenuItem>
              {/* USER */}
              {!isCollapsed && (
                <Box mb="25px">
                  <Box display="flex" justifyContent="center" alignContent="center">
                    {/*<img 
                      alt="profile-user"
                      width="100px"
                      heigth="100px"
                      src={}
                      style={{cursor:'pointer', borderRadius:"50px"}}
                    />*/}
                    <Skeleton variant="circular" height={100} width={100}/>
                  </Box>
                  <Box textAlign='center'>
                    <Typography variant="h2" color={colors.grey[100]} fontWeight='bold' sx={{ m: "10px 0 0 0"}}>NAME</Typography>
                    <Typography variant="h5" color={colors.greenAccent[500]} fontWeight='bold' sx={{ m: "10px 0 0 0"}}>INFO</Typography>
                  </Box>
                </Box>
              )}

            {/* MENU ITEM */}
            <Box paddingLeft={isCollapsed? undefined:"10%"}>
              <Item 
                title='Home'
                to='/'
                icon={<HomeRoundedIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              <Item 
                title='Sign Up / Login'
                to='/'
                icon={<ExitToAppRoundedIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                variant='h6'
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px"}}
              >
                Analyse
              </Typography>
              <Item 
                title='Dashboard'
                to='/'
                icon={<DashboardIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              <Item 
                title='Sur Mesure'
                to='/selection'
                icon={<IsoOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                variant='h6'
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px"}}
              >
                Paramétres
              </Typography>
              <Item 
                title='Profile'
                to='/'
                icon={<AccountCircleOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    );
  }
  
  export default Sidebar