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
  const [quantity,setQuantity] = useState(props.initQuantity)
  const [formerQuantity,setFormerQuantity] = useState(0)
  const [type,setType] = useState(props.initType)
  const [formerType,setFormerType] = useState(null)

  const id = props.id;

  //maj de userParc en cas ajout item ou modif
  useEffect(()=>{
    if ((type !== null)&!((type !== formerType)&(quantity !== formerQuantity))){
      props.interf(['majUserParc',[type,quantity,formerType,formerQuantity]]) //[type,quantity,formerType,formerQuantity]
    }  
  },[quantity,type, ]);
  
const handleClose = () => {
  setOpen(false);
};

const handleQuantityOnChange = (e) =>{
  setFormerQuantity(quantity);
  setFormerType(type);

  let nextQuantity = e.target.value.trim() === '' ? 0 : parseInt(e.target.value, 10);
  setQuantity(isNaN(nextQuantity) ? 0 : nextQuantity)
  
  console.log('new quantity', parseInt(e.target.value),typeof parseInt(e.target.value))
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
        >
          {typeList.map((element)  => (
            <MenuItem 
                key={element} 
                onClick={()=>{
                  setFormerQuantity(quantity);
                  setFormerType(type);
                  setType(element);
                }}>
                  {element}
            </MenuItem>
          ))}
        </MenuList>
        </ClickAwayListener>
      </Popup>
      <Divider orientation="vertical" />
      <Input 
            type="number"
            defaultValue={props.initQuantity}
            slotProps={{
              input: {
                min: 0,
                step: 1,
              },
            }}
            onChange={(e)=> handleQuantityOnChange(e)}
            sx={{
              "--Input-radius": "20px"
            }}
            variant="soft" />
      <Divider orientation="vertical" />
      <IconButton color="tertiary" onClick={() => props.interf(['delRequire',[id, type, quantity]])}>
        <DeleteIcon />
      </IconButton>
      {id}
    </div>
  )
}

export default InventoryItem