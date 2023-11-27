import React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import { ListItemContext } from './Inventory';
import { UserParc_API_Context } from './Dashboard';
import "../styles/InventoryItem.css";

import { Popper } from '@mui/base/Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { styled } from '@mui/joy/styles';
import Input from '@mui/joy/Input';
import Divider from '@mui/joy/Divider';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import MenuList from '@mui/joy/MenuList';
import MenuItem from '@mui/joy/MenuItem';
import Typography from '@mui/joy/Typography';

const Popup = styled(Popper)({
  zIndex: 1000,
});

function InventoryItem(props) {
  
  const buttonRef = useRef(null);
  const [listItem, setListItem] = useContext(ListItemContext)
  const [userParc_API,setUserParc_API] = useContext(UserParc_API_Context);

  const [open, setOpen] = React.useState(false);
  const [quantity,setQuantity] = useState(props.quantity)
  const [formerQuantity,setFormerQuantity] = useState(0)
  const [type,setType] = useState(props.type)
  const [formerType,setFormerType] = useState(null)

  console.log (listItem)
  const id = props.id;


  //maj de userParc_API en cas ajout item ou modif
  useEffect(()=>{
    if ((type !== null)){
      typeIn = false;

      userParc_API.forEach((item)=>{
        if(formerType === item.type){
          item.quantity = item.quantity-formerQuantity;
        }
        if(type === item.type){
          item.quantity = item.quantity+quantity;
          typeIn=true;
        }
      });

      if(typeIn === false){
        userParc_API.append({ type: type,
                              quantity: quantity,
                            })      
      }
    }  
  },[quantity,type]);

  const delButton = () => {return ( <IconButton color="tertiary" onClick={() => props.handlerDeleteItem(id, type, quantity)}>
                                          <DeleteIcon />
                                      </IconButton>);
                            }

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
          {Object.entries(props.data).map((element)  => (
            <List key={element[0]}>
              <ListItem sticky>
                <Typography
                  id={`sticky-list-demo-${element[0]}`}
                  level="body-xs"
                  textTransform="uppercase"
                  fontWeight="lg"
                >
                  {element[0]}
                </Typography>
              </ListItem>
              {Object.entries(element[1]).map((element)  => (
                <MenuItem 
                    key={element[0]} 
                    onClick={()=>{
                      setFormerType(type);
                      setType(element[0]);
                    }}>
                      {element[0]}
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
