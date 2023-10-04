import React from 'react'
import { useState } from 'react'
import "../styles/Inventory.css";
import Item from "./InventoryItem";
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function Inventory(props) {

  const [listItem, setListItem] = useState([]);

  const handlerUpdateList = (list) =>{
    setListItem(list);
  };

  const importData = (path) => {
    /*
    const data =""
    const reader = new FileReader();
    reader.readAsText(path);
    reader.onload = () => {
      data=reader.result;
    }
  
    data = JSON.parse(data);
    console.log(data)
    */
   const data =  {terminal: {
                    ordinateur_portable: [1500,50,5],
                    ordinateur_fixe: [400,40,4],
                    serveur: [1000,100,10]
                  },
                  peripherique: {   
                    clavier: [100,10,1],
                    souris: [50,5,0.5],
                    ecran: [300,30,3],
                    imprimante: [300,30,3]
                  }
                }  
    return data
  }

  const data = importData("../../backend/BD.Json")

  const handlerDeleteItem = (id) => {
    let tempList = [...listItem];
    tempList = tempList.filter(item => item.id !== id);
    setListItem(tempList);
  };

  const delButton = (id) => {return ( <IconButton color="tertiary" onClick={() => handlerDeleteItem(id)}>
                                          <DeleteIcon />
                                      </IconButton>);
                            }

  const handlerAddItem = () => {
    let tempList = [...listItem];
    let itemId = null

    const scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;

    if (listItem.length===0){itemId=0;}
    else{itemId=(listItem[listItem.length-1].id)+1;};
    tempList.push({   id: itemId,
                      item :<Item list={listItem} setList={handlerUpdateList} id={itemId} data={data} cost={props.cost} setCost={props.setCost} />
                  })
    setListItem(tempList);
  };

  return (
    <div className='inventory'>
      {listItem.map((item) => {return <div className='item' key ={item.id} >{item.item} {delButton(item.id)}</div>})}
      <Button startDecorator={<Add />} 
              color="neutral"
              variant="solid" 
              onClick={handlerAddItem}
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
