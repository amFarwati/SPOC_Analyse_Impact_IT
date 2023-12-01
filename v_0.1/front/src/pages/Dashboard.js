import React from 'react';
import "../styles/Dashboard.css";
import { useState, createContext, useEffect } from 'react'
import ResultDisplay from "../components/ResultDisplay"
import Inventory from "../components/Inventory"
import Divider from '@mui/joy/Divider';

export const User_Context = createContext();
export const API_Context = createContext();

function Dashboard() {
  const [userParc,setUserParc] = useState([]);
  const login = 'USER123456789';
  const baseUrl = `http://localhost:4000`;

  const updateUserParc = (newParc) => {
    setUserParc(newParc)
  }

  useEffect(()=>{
    console.log(`Dashboard =>`,userParc)
  },[userParc])

  return ( 
    <div>
      <User_Context.Provider value={ [userParc,setUserParc,login] }>
      <API_Context.Provider value={ [baseUrl] }>
        <ResultDisplay />
        <Divider orientation="horizontal" />
        <Inventory />
      </API_Context.Provider>
      </User_Context.Provider>
    </div>
  )
}

export default Dashboard
