import * as React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { User_Context } from '../pages/Dashboard';
import Papa from 'papaparse';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';

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

    const setUserParc = useContext(User_Context)[1];
    const [fileChange, setFileChange] = useState(false);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
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
        <Button
            color="neutral"
            variant="solid" 

            component="label"
            role={undefined}
            tabIndex={-1}
            style={{
                borderRadius: 30,
                padding: "18px 36px",
                fontSize: "20px"
            }}
        startDecorator={
            <SvgIcon>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
            </svg>
            </SvgIcon>
        }
        >
        Upload a file
        <VisuallyHiddenInput type="file" onChange={handleFileUpload}/>
        </Button>
    );
}
