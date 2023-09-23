import React from 'react'
import "../styles/InventoryItem.css";
import Input from '@mui/joy/Input';
import Divider from '@mui/joy/Divider';
import Button from '@mui/joy/Button';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function InventoryItem({props}) {
    const ID = props.ID;
  return (
    <div className='item'>
      Prop :
      <Input placeholder="Type in here…" variant="soft" />
      <Divider orientation="vertical" />
      Quantity :
      <Input placeholder="Type in here…" variant="soft" />
      <Divider orientation="vertical" />
      <Button startDecorator={<RemoveCircleOutlineIcon />} color="danger" high={20} width={20} onClick={function(){}} />
    </div>
  )
}

export default InventoryItem
