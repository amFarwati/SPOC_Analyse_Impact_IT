import { useState, createContext, useEffect } from 'react';
import { Box,IconButton,Button,Typography,useTheme,FormControl, InputLabel, Select,MenuItem } from "@mui/material";
import Header from "../../components/Header";
import Liste from "../../components/Liste";

import * as React from 'react';

function Item() {
    return (
        <Box m="20px">
            <Box  display="flex" justifyContent="space-between" alignItems="center">
              <Header title="ITEM Selection" subtitle="Choose each item by hand" />
            </Box>
            <Liste/>
        </Box>
    )
}
export default Item;
