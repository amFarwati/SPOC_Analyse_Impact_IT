import React from 'react'
import { useEffect, useState } from 'react'
import "../styles/Inventory.css";
import Item from "./InventoryItem";
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';

var listProps=[];

function Inventory() {

  const [addProps, setAddProps] = useState(false);

  useEffect(() => {
    const scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
    listProps.push(/*listProps.length===0?<Item ID ={0}/>:<Item ID ={listProps[listProps.length-1].ID+1}/>); console.log(listProps.length,listProps*/)
  }, [addProps]);

  return (
    <div className='inventory'>
      {listProps.map(item => {return <div className='item'>{item}</div>})}
      <Button startDecorator={<Add />} 
              variant="outlined" 
              onClick={()=>{setAddProps(!addProps)}}
              style={{
                borderRadius: 30,
                padding: "18px 36px",
                fontSize: "20px"
            }}
              size="lg">Add props</Button>
    </div>
  )
}

export default Inventory
