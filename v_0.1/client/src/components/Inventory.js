import React from 'react'
import { useState, useEffect, createContext, useContext } from 'react'
import { UserParc_API_Context } from './Dashboard';
import "../styles/Inventory.css";
import FileUpload from "./InputFileUpload";
import Item from "./InventoryItem";

import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export const ListItemContext = createContext();


function Inventory(props) {

  const [listItem, setListItem] = useState([]);
  const [userParc_API,setUserParc_PI] = useContext(UserParc_API_Context);

  // requete axios pour récupérer list des types pris en charge
  const backendData = null;

  const handlerDeleteItem = (id, type, quantity) => {
    let tempList = [...listItem];

    userParc_API.forEach((item)=>{
      if(type === item.type){
        item.quantity = item.quantity-quantity;
      }
    });

    tempList = tempList.filter(item => item.id !== id);
    setListItem(tempList);
  };

  const handlerAddItem = () => {
    let tempList = [...listItem];
    let itemId = null

    const scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;

    if (tempList.length===0){itemId=0;}
    else{itemId=(tempList[tempList.length-1].id)+1;};

    tempList.push({   id: itemId,
                      item :<Item id={itemId} type={null} quantity={0} data={backendData} handlerDeleteItem={handlerDeleteItem}/>
                  })

    setListItem(tempList);
  };

  const handlerAddParcItem = (parc) => {
    let tempList = [];

    const scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;

    parc.forEach((item) => {
      let itemId = null;

      if (tempList.length===0){itemId=0;}
      else{itemId=(tempList[tempList.length-1].id)+1;};

      tempList.push({   id: itemId,
                        item :<Item id={itemId} itemId={item.type} quantity={item.quantity} data={backendData} updateListCost={handlerUpdateItemCost}/>
                    })
    });

    setListItem(tempList);
  }

  useEffect(() => {
    if(userParc.length > 0){
      handlerAddParcItem(userParc);
    }
  },[userParc]);

  return (
    <ListItemContext.Provider value={ [listItem, setListItem] }>
    <div className='inventory'>
      {listItem.map((item) => {return <div className='item' key ={item.id} >{item.item}</div>})}
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
      <FileUpload />
    </div>
    </ListItemContext.Provider>
  )
}
export default Inventory

