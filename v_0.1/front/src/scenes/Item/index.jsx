import { Box,Divider,Button, IconButton,useTheme} from "@mui/material";
import Header from "../../components/Header";
import Liste from "../../components/Liste";
import {  tokens } from "../../theme";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined"



import * as React from 'react';

function Item() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleDataLoading = () => {
        
      };
    return (
        <Box m="20px">
            <Box  display="flex" justifyContent="space-between" alignItems="center">
              <Header title="Sélection des Items" subtitle="Choisissez chaque item à la main" />
            </Box>
            <Box textAlign="center" marginBottom="16px">
                <Button onClick={handleDataLoading} variant="contained" color="primary" size="large" sx={{backgroundColor:colors.blueAccent[700]}}>
                <UploadOutlinedIcon sx  = {{mr:"10px"}}/>
          Charger les données
        </Button>
      </Box>
      <Divider sx={{ marginY: 2 }} /> {/* Add a line of separation */}

            <Liste/>
        </Box>
    )
}
export default Item;