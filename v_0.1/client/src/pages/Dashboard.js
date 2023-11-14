import React from 'react';
import "../styles/Dashboard.css";
import { useState } from 'react'
import ImpactScore from "../components/ImpactScore"
import Inventory from "../components/Inventory"
import Divider from '@mui/joy/Divider';


function Dashboard() {
  const [totalCost, setTotalCost] = useState([0,0,0])

  const handlersetTotalCost = (newCost) => {
    console.log('dashboard former totalCost: ',totalCost,'dashboard new cost: ', newCost)
    setTotalCost(newCost);
    console.log('cost has been updated :',totalCost)
  }

  return (
    <div>
        <ImpactScore totalCost={totalCost}/>
        <Divider orientation="horizontal" />
        <Inventory setTotalCost={handlersetTotalCost}/>
    </div>
  )
}

export default Dashboard
