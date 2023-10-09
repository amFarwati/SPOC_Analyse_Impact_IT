import React from 'react';
import "../styles/Dashboard.css";
import { useState } from 'react'
import ImpactScore from "../components/ImpactScore"
import Inventory from "../components/Inventory"
import Divider from '@mui/joy/Divider';


function Dashboard() {
  const [totalCost, setTotalCost] = useState([0,0,0])

  const handlersetTotalCost = (cost) => {
    setTotalCost(cost);
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
