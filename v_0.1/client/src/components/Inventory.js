import React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import { User_Context } from '../pages/Dashboard';
import { API_Context } from '../pages/Dashboard';
import "../styles/Inventory.css";
import FileUpload from "./InputFileUpload";
import Item from "./InventoryItem";
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';


export const Type_Context = createContext();

function Inventory(props) {

  const [listItem, setListItem] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const userParc = useContext(User_Context)[0];
  const [baseUrl] = useContext(API_Context);
  

  // requete got pour récupérer list des types pris en charge
  const handlerGetTypeList = ()=>{
    /*
    got(`${baseUrl}/getTypeList`)
    .then((res)=>{setTypeList(res);})
    .catch((error)=>{console.error('ERROR:', error)});
    */
  }

  const handlerDeleteItem = (id, type, quantity) => {
    let tempList = [...listItem];

    userParc.forEach((item)=>{
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
                      item :<Item id={itemId} type={null} quantity={0} handlerDeleteItem={handlerDeleteItem}/>
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
                        item :<Item id={itemId} itemId={item.type} quantity={item.quantity}/>
                    })
    });

    setListItem(tempList);
  }

  useEffect(() => {
    if(userParc.length > 0){
      handlerAddParcItem(userParc);
    }
  },[userParc]);

  useEffect(() => {
    handlerGetTypeList();
  },[]);

  return (
    <Type_Context.Provider value={ [typeList, setTypeList] }>
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
      <Button startDecorator={<Add />} 
              color="neutral"
              variant="solid" 
              onClick={handlerGetTypeList}
              style={{
                borderRadius: 30,
                padding: "18px 36px",
                fontSize: "20px"
            }}
              size="lg">Reload BD</Button>
      <FileUpload />
    </div>
    </Type_Context.Provider>
  )
}
export default Inventory

