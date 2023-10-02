import React from 'react'
import "../styles/InventoryItem.css";
import Input from '@mui/joy/Input';
import Divider from '@mui/joy/Divider';
import Button from '@mui/joy/Button';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


function InventoryItem(props) {
  
  const [quantity,setQuantity] = useState(0)
  const [itemId,setItemId] = useState(null)
  const [cost,setCost] = useState([0,0,0])

  let attribute = {
                    id:props.id,
                    itemId:itemId,
                    quantity:quantity,
                    cost:cost,
                  }

  let list = props.list

  function fetchCalculationData(itemId){
    () => {
      setItemId(itemId)
      setCost([2,5,1])
    }
  }

  function handleDelete(){
    list.forEach(element => {
      console.log(element.attribute)
      if (element.attribute.id === this.attribute.id){
        let updateList = list.splice(list.indexOf(element),1);
        props.setList(updateList);
      };
    });
  }

  return (
    <div className='item'>
      Prop :
      <Input placeholder="Type in here…" variant="soft" />
      <Divider orientation="vertical" />
      Quantity :
      <Input placeholder="Type in here…" variant="soft" />
      <Divider orientation="vertical" />
      <Button startDecorator={<RemoveCircleOutlineIcon />} color="danger" high={20} width={20} onClick={() => handleDelete()} />
    </div>
  )
}

export default InventoryItem
