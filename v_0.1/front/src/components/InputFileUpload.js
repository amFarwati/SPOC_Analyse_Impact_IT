import * as React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { User_Context } from '../pages/Dashboard';
import { Box,Button,IconButton,Typography,useTheme } from "@mui/material";
import Papa from 'papaparse';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined"
import { tokens } from "../theme";


const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function InputFileUpload(props) {

    var setUserParc = useContext(User_Context);

    if (setUserParc) {
      setUserParc = setUserParc[1];
      // le reste du code à l'intérieur du bloc if
    } else {
      // Gérer le cas où le contexte est indéfini
      console.error("Le contexte User_Context est indéfini.");
    }

    const [fileChange, setFileChange] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        event.target.value = null;
        
        console.log(file)
        if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const csvContent = e.target.result;
            const results = Papa.parse(csvContent, {
            header: true,
            skipEmptyLines: true,
            });

            setUserParc(bdFormat_User(results.data));
            props.interf(['importInv']);
            setFileChange(!fileChange);
        };
        reader.readAsText(file);
        }
    };

    const extractTypeList = (jsonContent) => {
        let typeList = [];
        jsonContent.forEach((item)=>{
            if(!typeList.includes(item.type)){
                typeList.push(item.type);
            }
        })
        return typeList;
    };

    //fonction convertion csv en format JSON supporté par serveur et front [{type: string; quantity: int}, ]
    const bdFormat_User = (jsonContent) => {
        let itemList = [];
        jsonContent.forEach((item)=>{
            let found = false;
            let counter = 0;
            while(found === false & counter<itemList.length){
                if( itemList.length !== 0 & itemList[counter].type === item.type){

                    itemList[counter].quantity += parseInt(item.quantity);
                    found = true;
                }
                counter++;
            }
            if (found === false){
                itemList.push({
                    type:item.type,
                    quantity: parseInt(item.quantity)
                });
            }
        })
        return itemList;
    };

    return (
        <Button component="label" sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <UploadOutlinedIcon sx={{ mr: "10px" }} />
          Importer un fichier .csv
          <VisuallyHiddenInput type="file" onChange={handleFileUpload}/>
                    </Button>
        
        
    );
}
