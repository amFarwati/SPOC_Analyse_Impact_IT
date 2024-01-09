import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {ResponsiveBar} from "@nivo/bar";
import {tokens} from "../theme";

import InfoButton from "./infoButton";
import AirIcon from '@mui/icons-material/Air';
import MasksIcon from '@mui/icons-material/Masks';
import WifiIcon from '@mui/icons-material/Wifi';
import WaterIcon from '@mui/icons-material/Water';
import FactoryIcon from '@mui/icons-material/Factory';


function Barchart({isDashboard=false, unite, finDeVie, usage, fabrication, distribution, color}) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [graph_Type, setGraphType] = React.useState('symlog');

    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    var data = [
        {
          criteres: unite[0] === undefined? 'loading' :'     ',
          Fabrication: parseInt(fabrication[0]),
          FabricationColor: "hsl(229, 70%, 50%)",
          Distribution: parseInt(distribution[0]),
          DistributionColor: "hsl(296, 70%, 50%)",
          Utilisation: parseInt(usage[0]),
          UtilisationColor: "hsl(97, 70%, 50%)",
          "Fin de vie": parseInt(finDeVie[0]),
          "Fin de vieColor": "hsl(340, 70%, 50%)",
        },
        {
          criteres: unite[1] === undefined? 'loading' :`    `,
          Fabrication: parseInt(fabrication[1]*10000000),
          FabricationColor: "hsl(307, 70%, 50%)",
          Distribution: parseInt(distribution[1]*10000000),
          DistributionColor: "hsl(111, 70%, 50%)",
          Utilisation: parseInt(usage[1]*10000000),
          UtilisationColor: "hsl(273, 70%, 50%)",
          "Fin de vie": parseInt(finDeVie[1]*10000000),
          "Fin de vieColor": "hsl(275, 70%, 50%)",
        },
        {
          criteres: unite[2] === undefined? 'loading' :`   `,
          Fabrication: parseInt(fabrication[2]),
          FabricationColor: "hsl(72, 70%, 50%)",
          Distribution: parseInt(distribution[2]),
          DistributionColor: "hsl(96, 70%, 50%)",
          Utilisation: parseInt(usage[2]),
          UtilisationColor: "hsl(106, 70%, 50%)",
          "Fin de vie": parseInt(finDeVie[2]),
          "Fin de vieColor": "hsl(256, 70%, 50%)",
        },
        {
          criteres: unite[3] === undefined? 'loading' :`  `,
          Fabrication: parseInt(fabrication[3]*100),
          FabricationColor: "hsl(257, 70%, 50%)",
          Distribution: parseInt(distribution[3]*100),
          DistributionColor: "hsl(326, 70%, 50%)",
          Utilisation: parseInt(usage[3]*100),
          UtilisationColor: "hsl(110, 70%, 50%)",
          "Fin de vie": parseInt(finDeVie[3]*100),
          "Fin de vieColor": "hsl(9, 70%, 50%)",
        },
        {
          criteres: unite[4] === undefined? 'loading' : ` `,
          Fabrication: parseInt(fabrication[4]*10000),
          FabricationColor: "hsl(190, 70%, 50%)",
          Distribution: parseInt(distribution[4]*10000),
          DistributionColor: "hsl(325, 70%, 50%)",
          Utilisation: parseInt(usage[4]*10000),
          UtilisationColor: "hsl(54, 70%, 50%)",
          "Fin de vie": parseInt(finDeVie[4]*10000),
          "Fin de vieColor": "hsl(285, 70%, 50%)",
        },
        
      ];

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box height='100%' width='100%' >
            <FormControl>
                <RadioGroup
                    row
                    name="config_choice"
                    defaultValue="symlog"
                >
                    <FormControlLabel value="symlog" onChange={()=>{setGraphType('symlog')}} control={<Radio />} label="symlog" />
                    <FormControlLabel value="lineaire" onChange={()=>{setGraphType('linear')}} control={<Radio />} label="lineaire" />
                </RadioGroup>
            </FormControl>
            <Box height = "80%" >
                <ResponsiveBar
                data={data}
                valueScale={{ type: graph_Type }}
                groupMode='grouped'
   /*             tooltip={(tooltip) => {
                    return (
                      <div
                        style={{
                          background: colors.grey[800], // Changer cette couleur en fonction de vos besoins
                          padding: '9px',
                          borderRadius: '3px',
                          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
                        }}
                      >
                        <strong style={{ color: colors.grey[200] }}>{tooltip.data.Fabrication}</strong>
                        <br />
                        <span style={{ color: tooltip.color }}>
                          {tooltip.color}
                        </span>
                      </div>
                    );
                  }}*/
                theme={{
                    axis:{
                        domain:{
                            line:{
                                stroke:colors.grey[100],
                            },
                        },
                        legend:{
                            text:{
                                fill:colors.grey[100],
                            },
                        
                        },
                        ticks:{
                            line:{
                                stroke:colors.grey[100],
                                strokeWidth:1,
                            },
                            text:{
                                fill:colors.grey[100],
                            },
                        
                        },
                    },
                    legends:{
                        text:{
                            fill:colors.grey[100],
                        },
                    },
                }}
                keys={[
                    'Fabrication',
                    'Distribution',
                    'Utilisation',
                    'Fin de vie'
                ]}
                indexBy="criteres"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.1}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: color }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 5,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'fries'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'sandwich'
                        },
                        id: 'lines'
                    }
                ]}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? undefined :'criteres',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickValues: [0, 10, 100, 1000, 10000, 20000, 30000],
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? undefined : 'etapeACV',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    truncateTickAt: 0
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={e=>e.id+": "+e.formattedValue+" in criteres: "+e.indexValue}
            />
        </Box>
        <Box display="flex" justifyContent="space-around" alignItems="center" ml={8} mr={18}>
            <InfoButton title={<AirIcon fontSize='large'/>} info={`Changement Climatique\n${unite[0]}`} />
            <InfoButton title={<MasksIcon fontSize='large'/>} info={`Particules fines\n*e10-7 ${unite[1]}`} />
            <InfoButton title={<WifiIcon fontSize='large'/>} info={`Radiations ionisantes\n${unite[2]}`} />
            <InfoButton title={<WaterIcon fontSize='large'/>} info={`Acidification\n*e10-2 ${unite[3]}`} />
            <InfoButton title={<FactoryIcon fontSize='large'/>} info={`Usage des ressources\n(mineraux et metaux)\n*e10-7 ${unite[4]}`} />
        </Box>  
    </Box>
    );
  }
  
  export default Barchart;