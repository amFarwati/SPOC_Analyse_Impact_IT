import React from 'react';
import "../styles/Dashboard.css";

import ImpactScore from "../components/ImpactScore"
import Inventory from "../components/Inventory"
import Divider from '@mui/joy/Divider';


function Dashboard() {
  return (
    <div>
        <ImpactScore/>
        <Divider orientation="horizontal" />
        <Inventory/>
    </div>
  )
}

export default Dashboard
