import React from 'react';
import "../styles/ImpactScore.css";
import { BarChart } from '@mui/x-charts/BarChart';


function ImpactScore(props) {

  let cost = props.cost
  let BD = {xAxis:['GES','EAU','Terres Rares'],series:[{data:cost},{data:cost},{data:cost}]};

  return (
    <div className='impactScore'>
      <div className='chart'>
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
        />
      </div>
      <div className='texte'>
                  
      </div>
    </div>
  )
}

export default ImpactScore
