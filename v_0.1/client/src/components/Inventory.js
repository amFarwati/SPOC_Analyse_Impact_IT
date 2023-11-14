import React from 'react'
import { useState, useEffect, createContext } from 'react'
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
  const [backendData, setBackendData] = useState([{}]);
  const [userParc,setUserParc] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getCostBd"
    ).then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      }
    )
  },[]);

  const handlerDeleteItem = (id) => {
    let tempList = [...listItem];
    tempList = tempList.filter(item => item.id !== id);
    setListItem(tempList);
  };

  const delButton = (id) => {return ( <IconButton color="tertiary" onClick={() => handlerDeleteItem(id)}>
                                          <DeleteIcon />
                                      </IconButton>);
                            }

  const handlerUpdateItemCost = (newCost) => {
    props.setTotalCost(newCost);
  };

  const handlerAddItem = () => {
    let tempList = [...listItem];
    let itemId = null

    const scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;

    if (tempList.length===0){itemId=0;}
    else{itemId=(tempList[tempList.length-1].id)+1;};

    tempList.push({   id: itemId,
                      cost:[0,0,0],
                      item :<Item id={itemId} itemId={null} quantity={0} data={backendData} updateListCost={handlerUpdateItemCost}/>
                  })

    setListItem(tempList);
  };

  const handlerSetUserParc = (parc) => {
    setUserParc(parc);
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
                        cost:[0,0,0],
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
      <FileUpload setUserFile={handlerSetUserParc}/>
    </div>
    </ListItemContext.Provider>
  )
}
export default Inventory

