import React from 'react';
import "../styles/Dashboard.css";
import { useState, createContext } from 'react'
import ResultDisplay from "../components/ResultDisplay"
import Inventory from "../components/Inventory"
import Divider from '@mui/joy/Divider';
import CircularProgress from '@mui/material/CircularProgress';

export const User_Context = createContext();
export const API_Context = createContext();

function Dashboard() {
  const [userParc,setUserParc] = useState([]);
  const [onLoad,setOnLoad] = useState(false);
  const login = 'USER123456789';
  const baseUrl = `http://localhost:4000`;


  return ( 
    <div>
      <User_Context.Provider value={ [userParc,setUserParc,login] }>
      <API_Context.Provider value={ [baseUrl] }>
        <ResultDisplay onLoad = {setOnLoad}/>
        <Divider orientation="horizontal" />
        {onLoad? <CircularProgress color="success" />:<Inventory />}
      </API_Context.Provider>
      </User_Context.Provider>
    </div>
  )
}

export default Dashboard