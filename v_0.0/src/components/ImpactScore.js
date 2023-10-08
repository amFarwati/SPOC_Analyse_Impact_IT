import React from 'react';
import "../styles/ImpactScore.css";
import { BarChart } from '@mui/x-charts/BarChart';


function ImpactScore({totalCost}) {

  const [ges,eau,terresRares] =  totalCost;
  /*
  console.log("totalCost ",totalCost);
  console.log("ges ",ges);
  console.log("eau ",eau);
  console.log("terresRares ",terresRares);
  */
  let BD = {xAxis:['GES','EAU','Terres Rares'],series:[{data:ges},{data:eau},{data:terresRares}]};

  return (
    <div className='impactScore'>
      <div className='chart'>
       {/*
        <BarChart
            xAxis={[{ 
                    scaleType: 'band', 
                    data: BD.xAxis,
                    categoryGapRatio: 0.2,
                    barGapRatio: 0.3
                  }]}
            series={BD.series}
            width={500}
            height={300}
                />*/}
      </div>
      <div className='texte'>
        <li>GES : {ges}</li>
        <li>Eau : {eau}</li>
        <li>Terres rares : {terresRares}</li>      
      </div>
    </div>
  )
}

export default ImpactScore
