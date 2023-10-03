import React from 'react';
import "../styles/ImpactScore.css";
import { BarChart } from '@mui/x-charts/BarChart';

let BD = {xAxis:['production','transport','total'],series:[{data:[5,8,9]},{data:[1,1,1]},{data:[2,0,7]}]};

function ImpactScore() {
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
