import React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import { User_Context } from '../pages/Dashboard';
import { API_Context } from '../pages/Dashboard';
import "../styles/Inventory.css";
import FileUpload from "./InputFileUpload";
import Item from "./InventoryItem";
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import axios from 'redaxios';


export const Type_Context = createContext();

function Inventory(props) {

  const [listItem, setListItem] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [interf, setInterf] = useState([]);
  const [userParc,setUserParc] = useContext(User_Context);
  const [baseUrl] = useContext(API_Context);
  
  const majUserParc = (argv)=>{
    let typeIn = false;
    let userParcCopy = [...userParc];
    let [type,quantity,formerType,formerQuantity] = argv;

      userParcCopy.forEach((item)=>{
        if((formerType === item.type)&( formerType!== undefined)){
          
          item.quantity = parseInt(item.quantity-parseInt(formerQuantity));
          //console.log (item.quantity )
        }
        if((type === item.type)&(type!== undefined)){
          item.quantity = parseInt(item.quantity+parseInt(quantity));
          //console.log (item.quantity )
          typeIn=true;
        }
      });

      if(typeIn === false){
        userParcCopy.push({ type: type,
                            quantity: parseInt(quantity),
                            })      
      }

      console.log('majUserParc => userParcCopy =>',userParcCopy);
      setUserParc(userParcCopy);
  };

  // requete serveur pour récupérer list des types pris en charge
  const handlerGetTypeList = ()=>{
    console.log(`handlerGetTypeList ${baseUrl} =>`)

    axios.get(`${baseUrl}/getTypeList`, { withCredentials: true })
        .then(res => {
            // Vérification si la requête a réussi (statut 200-299)
            if (!res.ok) {
                throw new Error(`Erreur HTTP! Statut: ${res.status}`);
            }
            // Manipulation des données
            console.log(res.data)
            setTypeList(res.data)
        })
        .catch(error => {
            // Gestion des erreurs
            console.error('Erreur de redaxios:', error.message);
        });
  };

  const handlerDeleteItem = (argv) => {
    let tempList = [...listItem];
    let userParcCopy = [...userParc];
    let [id, type, quantity] = argv;

    userParcCopy.forEach((item)=>{
      if((type === item.type)&(type!== undefined)){
        console.log(`${item.quantity}-${quantity}`)
        item.quantity = item.quantity-parseInt(quantity);
        console.log(item.quantity)
        if(item.quantity === 0){
          userParcCopy = userParcCopy.filter(item => item.type !== type);
        }
      }
    });

    tempList = tempList.filter(item => item.id !== id);

    console.log('handlerDeleteItem => userParcCopy =>',userParcCopy);
    setUserParc(userParcCopy);
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
                      item :<Item id={itemId} initType={null} initQuantity={0} interf={setInterf}/>
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
                        item :<Item id={itemId} initType={item.type} initQuantity={item.quantity} interf={setInterf}/>
                    })
    });

    setListItem(tempList);
  }

  const handlerInterf = ()=>{
    switch(interf[0]){
      case 'delRequire':
        console.log(`delRequire => ${interf[1]}`,userParc);
        handlerDeleteItem(interf[1]);
        break;
      case 'majUserParc':
        console.log(`majUserParc => ${interf}`,userParc);
        majUserParc(interf[1]);
        break;
      case 'importInv':
        console.log(`importInv => ${interf}`,userParc);
        handlerAddParcItem(userParc);
        break;
    }
  };

  //prise en charge interf inventory et inventoryItem
  useEffect(() => {
    handlerInterf();
  },[interf]);

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
      <FileUpload interf={setInterf}/>
    </div>
    </Type_Context.Provider>
  )
}
export default Inventory

