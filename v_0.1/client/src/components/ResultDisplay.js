import React from 'react';
import { useContext, useEffect } from 'react';
import { UserParc_API_Context } from './Dashboard';
import "../styles/ResultDisplay.css";
import { BarChart } from '@mui/x-charts/BarChart';


function ResultDisplay() {

  const [userParc_API,setUserParc_API] = useContext(UserParc_API_Context);
  const [ges,eau,terresRares] = null;

  useEffect(() => {
    if (userParc_API!==null){
      //requete axios GET /getImpact <user>
    }
  },[userParc_API]);

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
