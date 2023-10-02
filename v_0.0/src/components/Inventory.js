import React from 'react'
import { useEffect, useState } from 'react'
import "../styles/Inventory.css";
import Item from "./InventoryItem";
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';

function Inventory() {

  const [addItem, setAddItem] = useState(0);
  const [listItem, setListItem] = useState([]);
  const data = {
    terminal : {
      ordinateur_portable:[500,50,5],
      ordinateur_fixe:[400,40,4],
      serveur:[1000,100,10],
    },
    peripherique:{
      clavier:[100,10,1],
      souris:[50,5,0.5],
      ecran:[300,30,3],
      imprimante:[300,30,3]
    }
  }

  function handlerUpdateList(list){
    setListItem(list);
  }

  useEffect(() => {

    const scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
    listItem.push([addItem,<Item list={listItem} setList={handlerUpdateList} id={addItem} data={data}/>])
    setListItem(listItem)
    
  }, [addItem]);

  return (
    <div className='inventory'>
      {listItem.map((item) => {return <div className='item'>{item[1]}</div>})}
      <Button startDecorator={<Add />} 
              color="neutral"
              variant="solid" 
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
