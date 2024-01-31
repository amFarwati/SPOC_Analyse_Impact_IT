import React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import { Type_Context } from './Inventory';
import "../styles/InventoryItem.css";
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { Popper } from '@mui/base/Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { styled } from '@mui/joy/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Input from '@mui/joy/Input';
import Divider from '@mui/joy/Divider';
import Button from '@mui/joy/Button';
import MenuList from '@mui/joy/MenuList';
import MenuItem from '@mui/joy/MenuItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const Popup = styled(Popper)({
  zIndex: 1000,
});

dayjs.locale('fr');

function InventoryItem(props) {
  
  const typeList = useContext(Type_Context)[0];
  const buttonRef = useRef(null);
  const [open, setOpen] = React.useState(false);

  const [quantity,setQuantity] = useState(props.initQuantity)
  const [dateDebut, setDateDebut] = useState(props.initDateDebut)
  const [formerQuantity,setFormerQuantity] = useState(0)
  const [formerDateDebut,setFormerDateDebut] = useState(null)
  const [type,setType] = useState(props.initType)
  const [formerType,setFormerType] = useState(null)

  const id = props.id;
  
  //maj de userParc en cas ajout item ou modif
  useEffect(()=>{
    if ((type !== null)&(dateDebut !== null)&!((type !== formerType)&(quantity !== formerQuantity))){
      props.interf(['majUserParc',[type,quantity,formerType,formerQuantity,dateDebut,formerDateDebut===null?null:formerDateDebut]]) //[type,quantity,formerType,formerQuantity,dateDebut, formerDateDebut]
    }  
  },[quantity,type,dateDebut]);
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleQuantityOnChange = (e) =>{
    setFormerQuantity(quantity);
    setFormerDateDebut(dateDebut);
    setFormerType(type);

    let nextQuantity = e.target.value.trim() === '' ? 0 : parseInt(e.target.value, 10);
    setQuantity(isNaN(nextQuantity) ? 0 : nextQuantity)
  };

  const handleDateChange = (date) => {
    if (date!== undefined||null){
      setFormerDateDebut(dateDebut);
      setFormerQuantity(quantity);
      setFormerType(type);

      setDateDebut(dayjs(date,'DD/MM/YYYY').format('YYYY-MM-DD'));
    }
  };

  const handleTypeChange = (e) => {
    setFormerQuantity(quantity);
    setFormerDateDebut(dateDebut);
    setFormerType(type);
    setType(e);
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
          {typeList.map((element)  => (
            <MenuItem 
                key={element} 
                onClick={()=>{handleTypeChange(element)}}>
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
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
        <DatePicker
          label="Explotation start"
          format="DD/MM/YYYY"
          value={dayjs(dateDebut)}
          onChange={(newDate)=>handleDateChange(newDate)}
        />
      </LocalizationProvider>
      <IconButton color="tertiary" onClick={() => props.interf(['delRequire',[id, type, quantity, dateDebut]])}>
        <DeleteIcon />
      </IconButton>
      {id}
    </div>
  )
}

export default InventoryItem