import React from 'react'
import { useState, useRef, useEffect } from 'react'
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
  const [open, setOpen] = React.useState(false);
  const [quantity,setQuantity] = useState(0)
  const [itemId,setItemId] = useState(null)
  const [cost,setCost] = useState(null)

  const id = props.id;

  const handleClose = () => {
    setOpen(false);
  };

  const handlerUpdateCost = () => {
    let tempItemTotalCost = [0,0,0];
    for (let i = 0; i < tempItemTotalCost.length; i++){
      tempItemTotalCost[i] = quantity*cost[i];
    }
    console.log('id',id,'cost change',tempItemTotalCost)
    props.updateListCost(id,tempItemTotalCost);
  };

  useEffect(() => {
    if (cost !== null){
      handlerUpdateCost();
    }
  }, [cost,quantity]);

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
        {itemId===null?'Props':itemId}
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
                <MenuItem key={element[0]} onClick={()=>{setCost(element[1].split(';').map((value) => {return parseInt(value, 10);}
                  )); setItemId(element[0]);}}>{element[0]}</MenuItem>
              ))}
            </List>
          ))}
        </MenuList>
        </ClickAwayListener>
      </Popup>
      <Divider orientation="vertical" />
      <Input 
            type="number"
            defaultValue={0}
            slotProps={{
              input: {
                min: 0,
                max: 2000,
                step: 1,
              },
            }}
            onChange={ event => {setQuantity(event.target.value);}}
            sx={{
              "--Input-radius": "20px"
            }}
            variant="soft" />
      <Divider orientation="vertical" />
    </div>
  )
}

export default InventoryItem
