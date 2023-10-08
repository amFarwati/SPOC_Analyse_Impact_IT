import React from 'react'
import { useState, useEffect } from 'react'
import "../styles/Inventory.css";
import Item from "./InventoryItem";
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function Inventory(props) {

  const [listItem, setListItem] = useState([]);

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
    alert('handlerDeleteItem')
    let tempList = [...listItem];
    tempList = tempList.filter(item => item.id !== id);
    setListItem(tempList);
  };

  const delButton = (id) => {return ( <IconButton color="tertiary" onClick={() => handlerDeleteItem(id)}>
                                          <DeleteIcon />
                                      </IconButton>);
                            }

   //PB avec le handler d'update de coup, quand on le passe en arg dans le component Item => la listItem se reset à vide
  const handlerUpdateItemCost = (quantity, cost, id) => {
    alert('handlerUpdateItemCost')
    /*
    let tempList = [...listItem];
    console.log('listItem before',listItem);
    tempList.forEach(item => {
      if (item.id === id){
        for (let i = 0; i < cost.length; i++){
          item.cost[i] = quantity*cost[i];
        }
      }
    });
    console.log('tempList after',tempList);
    setListItem(tempList);*/
  };

  const handlerAddItem = () => {
    let tempList = [...listItem];
    let itemId = null

    const scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;

    if (listItem.length===0){itemId=0;}
    else{itemId=(listItem[listItem.length-1].id)+1;};
    tempList.push({   id: itemId,
                      item :<Item id={itemId} data={data} addCost={handlerUpdateItemCost}/>,
                      cost:[0,0,0]
                  })
    setListItem(tempList);
  };

  const handlerUpdateCost = () => {
    alert('handlerUpdateCost')
    let tempTotalCost = [0,0,0]
    listItem.forEach((item) => {
      for (let i = 0; i <tempTotalCost.length; i++) {
        tempTotalCost[i] = tempTotalCost[i] + item.cost[i];
      }
    });
    props.setTotalCost(tempTotalCost);
  };

  useEffect(() => {
    handlerUpdateCost();
  }, [listItem]);

  return (
    <div className='inventory'>
      {listItem.map((item) => {return <div className='item' key ={item.id} >{item.item} {delButton(item.id)}</div>})}
      {console.log(listItem)}
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
