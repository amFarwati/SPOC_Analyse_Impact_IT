import React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import { User_Context } from '../pages/Dashboard';
import { Type_Context } from './Inventory';
import "../styles/InventoryItem.css";

import { Popper } from '@mui/base/Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { styled } from '@mui/joy/styles';
import Input from '@mui/joy/Input';
import Divider from '@mui/joy/Divider';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import MenuList from '@mui/joy/MenuList';
import MenuItem from '@mui/joy/MenuItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Popup = styled(Popper)({
  zIndex: 1000,
});

function InventoryItem(props) {
  
  const buttonRef = useRef(null);
  const userParc = useContext(User_Context)[0];
  const typeList = useContext(Type_Context)[0];

  const [open, setOpen] = React.useState(false);
  const [quantity,setQuantity] = useState(props.quantity)
  const [formerQuantity,setFormerQuantity] = useState(0)
  const [type,setType] = useState(props.type)
  const [formerType,setFormerType] = useState(null)

  const id = props.id;


  //maj de userParc en cas ajout item ou modif
  useEffect(()=>{
    if ((type !== null)){
      let typeIn = false;

      userParc.forEach((item)=>{
        if(formerType === item.type){
          item.quantity = item.quantity-formerQuantity;
        }
        if(type === item.type){
          item.quantity = item.quantity+quantity;
          typeIn=true;
        }
      });

      if(typeIn === false){
        userParc.append({ type: type,
                              quantity: quantity,
                            })      
      }
    }  
  },[quantity,type,userParc,formerQuantity,formerType]);

  const delButton = () => {return ( <IconButton color="tertiary" onClick={() => props.handlerDeleteItem(id, type, quantity)}>
                                          <DeleteIcon />
                                      </IconButton>);
                            }
  
const handleClose = () => {
  setOpen(false);
};
  

  return (
    <div className='item'>
      <Button
        ref={buttonRef}
        id="composition-button"
        aria-controls={'composition-menu'}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="solid"
        color="neutral"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {type===null?'Props':type}
      </Button>
      <Popup
        role={undefined}
        id="composition-menu"
        open={open}
        anchorEl={buttonRef.current}
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 4],
            },
          },
        ]}
      >
        <ClickAwayListener onClickAway={handleClose}>
        <MenuList
                component="div"
                variant="outlined"
                size="sm"
                sx={{
                  boxShadow: 'sm',
                  flexGrow: 0,
                  minWidth: 200,
                  maxHeight: 240,
                  overflow: 'auto',
                }}
        >{typeList.map((element)  => (
            <List key={element}>
              {typeList.map((element)  => (
                <MenuItem 
                    key={element} 
                    onClick={()=>{
                      setFormerType(type);
                      setType(element);
                    }}>
                      {element}
                </MenuItem>
              ))}
            </List>
          ))}
        </MenuList>
        </ClickAwayListener>
      </Popup>
      <Divider orientation="vertical" />
      <Input 
            type="number"
            defaultValue={quantity}
            slotProps={{
              input: {
                min: 0,
                max: 2000,
                step: 1,
              },
            }}
            onChange={(event)=> {
              setFormerQuantity(quantity);
              setQuantity(event.target.value);
            }}
            sx={{
              "--Input-radius": "20px"
            }}
            variant="soft" />
      <Divider orientation="vertical" />
      {delButton}
    </div>
  )
}

export default InventoryItem
