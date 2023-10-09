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
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5000/getCostBd"
    ).then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
        console.log("Backend", data);
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

   //PB avec le handler d'update de coup, quand on le passe en arg dans le component Item => la listItem se reset à vide
  const handlerUpdateItemCost = (quantity, cost, id) => {
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
                      item :<Item id={itemId} data={backendData} addCost={handlerUpdateItemCost}/>,
                      cost:[0,0,0]
                  })
    setListItem(tempList);
  };

  const handlerUpdateCost = () => {
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
      <Button startDecorator={<Add />} 
              color="neutral"
              variant="solid" 
              onClick={()=>{return}}
              style={{
                borderRadius: 30,
                padding: "18px 36px",
                fontSize: "20px"
            }}
              size="lg">Import IT inventory</Button>
    </div>
  )
}

export default Inventory
