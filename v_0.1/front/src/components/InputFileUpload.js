import * as React from 'react';
import { useState, useContext } from 'react';
import { User_Context } from '../scenes/Dashboard/index.jsx';
import Papa from 'papaparse';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.locale('fr');
dayjs.extend(customParseFormat)

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export default function InputFileUpload() {

    const setUserParc = useContext(User_Context)[1];
    const [fileChange, setFileChange] = useState(false);

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

            let invNormalised = bdFormat_User(results.data);
            console.log("apres",invNormalised);
            setUserParc(invNormalised);
            setFileChange(!fileChange);
        };
        reader.readAsText(file);
        }
    };

    //fonction convertion csv en format JSON supporté par serveur et front [{type: string; dateDebut: date ;quantity: int}, ]
    const bdFormat_User = (jsonContent) => {
        let itemList = [];
        jsonContent.forEach((item)=>{
            let found = false;
            let counter = 0;
            
            item.dateDebut=dayjs(item.dateDebut,'DD/MM/YYYY').format('YYYY-MM-DD');

            while(found === false & counter<itemList.length){
                if( itemList.length !== 0 & itemList[counter].type === item.type & itemList[counter].dateDebut === item.dateDebut){

                    itemList[counter].quantity += parseInt(item.quantity);
                    found = true;
                }
                counter++;
            }
            if (found === false){
                itemList.push({
                    type:item.type,
                    dateDebut: item.dateDebut,
                    quantity: parseInt(item.quantity)
                });
            }
        })
        return itemList;
    };

    return (
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type="file" onChange={handleFileUpload}/>
        </Button>
    );
}