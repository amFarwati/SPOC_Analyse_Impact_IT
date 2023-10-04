import React from 'react'
import { useState, useRef } from 'react'
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
  const [cost,setCost] = useState([0,0,0])

  const handleClose = () => {
    setOpen(false);
  };

  /*useEffect(() => {
    props.setCost(0)
    list.map((element) => {  
    for (let i = 0; i < props.cost.length; i++) {
      props.setCost(props.cost[i]);
    }

  });
    
  }, [cost,quantity]);*/

  let attribute = { 
                    id: props.id,
                    itemId:itemId,
                    quantity:quantity,
                    cost:cost,
                  }


  /*function handleDelete(){
    console.log(list)
    list.forEach((element) => {
      console.log(element)
      console.log(element[0], attribute.id)
      let updateList = list.filter((element) => element[0] !== attribute.id);
      props.setList(updateList);
      
    });
  }
  */

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
                <MenuItem key={element[0]} onClick={()=>{setCost(element[1]); setItemId(element[0]); console.log(element[0],cost)}}>{element[0]}</MenuItem>
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
            onChange={ event => {setQuantity(event.target.value);console.log("quantity = ",quantity," id = ",attribute.id)}}
            sx={{
              "--Input-radius": "20px"
            }}
            variant="soft" />
      <Divider orientation="vertical" />
    </div>
  )
}

export default InventoryItem
