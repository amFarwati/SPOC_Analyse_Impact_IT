import { useState, createContext, useEffect } from 'react'
import { Box,Button,IconButton,Typography,useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import Linechart from "../../components/Linechart";
import Barchart from "../../components/Barchart";
import Piechart from "../../components/Piechart";
import StatBox from "../../components/StatBox";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined"
import InputFileUpload from "../../components/InputFileUpload"
import { styled } from '@mui/joy';


function Dashboard() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
      <Box m="20px">
        <Box  display="flex" justifyContent="center" alignItems="center" mb="50px">
           <Button sx={{
    backgroundColor: colors.blueAccent[700],
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
  }}
>
  <UploadOutlinedIcon sx={{ mr: "10px" }} />
  Importer un fichier .csv

            </Button>
            </Box>
          <Box  display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle="Welcome to your Dashboard" />
        
            </Box>

          {/*GRID and charts*/}
          <Box  display="grid" gridTemplateColumns="repeat(12,1fr)" gridAutoRows="140px" gap="20px" mt="20px">
            {/*ROW 1*/}
            
            <Box gridColumn="span 4" gridRow="span 3" backgroundColor={colors.primary[400]}> 
              <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>Climate change</Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon sx={{fontSize:"26px", color:colors.greenAccent[500]}}/>
                  </IconButton>
                </Box>
              </Box>
              <Box height = "90%" >
                <Piechart />
            </Box>
            </Box>
            <Box gridColumn="span 8" gridRow="span 3" backgroundColor={colors.primary[400]}> 
              <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>EtapeACV</Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon sx={{fontSize:"26px", color:colors.greenAccent[500]}}/>
                  </IconButton>
                </Box>
              </Box>
              <Box height = "90%" >
                <Barchart isDashboard={true}/>
            </Box>
            </Box>
            <Box gridColumn="span 8" gridRow="span 3" backgroundColor={colors.primary[400]}> 
              <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>Suivi</Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon sx={{fontSize:"26px", color:colors.greenAccent[500]}}/>
                  </IconButton>
                </Box>
              </Box>
              <Box height="90%" ml="-20px">
                 <Linechart isDashboard={true}/>
             </Box>
            </Box>
          </Box>
          
          
      </Box>

    );
  }
  
  export default Dashboard;