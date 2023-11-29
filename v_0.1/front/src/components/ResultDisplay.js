import React from 'react';
import { useContext, useEffect } from 'react';
import { User_Context } from '../pages/Dashboard';
import { API_Context } from '../pages/Dashboard';
import "../styles/ResultDisplay.css";
import { BarChart } from '@mui/x-charts/BarChart';
//import axios from 'redaxios';


function ResultDisplay() {

  const userParc = useContext(User_Context)[0];
  const login = useContext(User_Context)[2];
  const [baseUrl] = useContext(API_Context);
  var [ges,eau,terresRares] = [0,0,0];

  useEffect(() => {
    if (userParc!==null){
      /*
      got.put({
        url: `${baseUrl}/setInventory`,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user: `${login}_test`,
            inventory: userParc
            })
      })
      .then((res)=>{console.log(res);})
      .catch((error)=>{console.error('ERROR:', error)});

      got(`${baseUrl}/getImpact/${login}_test`)
      .then((res)=>{
        console.log(res);
        res.forEach((stat)=>{stat = parseFloat(stat)});
        [ges,eau,terresRares]=res;
      })
      .catch((error)=>{console.error('ERROR:', error)});
      */
    }
  },[userParc]);

  /*
  console.log("totalCost ",totalCost);
  console.log("ges ",ges);
  console.log("eau ",eau);
  console.log("terresRares ",terresRares);
  */
  let BD = {xAxis:['GES','EAU','Terres Rares'],series:[{data:ges},{data:eau},{data:terresRares}]};

  return (
    <div className='impactScore'>
      <div className='graphics'>
      </div>
      <div className='camemberts'>
      </div>
      <div className='texts'>
        <li>GES : {ges}</li>
        <li>Eau : {eau}</li>
        <li>Terres rares : {terresRares}</li>      
      </div>
    </div>
  )
}

export default ResultDisplay
