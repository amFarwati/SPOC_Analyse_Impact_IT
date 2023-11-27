import React from 'react';
import "../styles/Dashboard.css";
import { useState, createContext } from 'react'
import ResultDisplay from "../components/ResultDisplay"
import Inventory from "../components/Inventory"
import Divider from '@mui/joy/Divider';

export const UserParc_API_Context = createContext();

function Dashboard() {
  const [userParc_API,setUserParc_API] = useState(null);

  return (
    <div>
      <UserParc_API_Context.Provider value={ [userParc_API,setUserParc_API] }>
        <ResultDisplay />
        <Divider orientation="horizontal" />
        <Inventory />
      </UserParc_API_Context.Provider>
    </div>
  )
}

export default Dashboard
