import React from 'react'
import { useEffect, useState } from 'react'
import "../styles/Inventory.css";
import Item from "./InventoryItem";
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';



function Inventory() {

  const [addItem, setAddItem] = useState(0);
  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    if (addItem===0){
      return;
    }
    const scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
    listItem.push(<Item list={listItem} setList={setListItem} id={addItem}/>)
    setListItem(listItem)
    
  }, [addItem]);

  return (
    <div className='inventory'>
      {listItem.map((item) => {return <div className='item'>{item}</div>})}
      <Button startDecorator={<Add />} 
              variant="outlined" 
              onClick={()=>{setAddItem(addItem+1);console.log(addItem)}}
              style={{
                borderRadius: 30,
                padding: "18px 36px",
                fontSize: "20px"
            }}
              size="lg">Add Item</Button>
    </div>
  )
}

export default Inventory
