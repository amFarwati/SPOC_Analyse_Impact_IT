import { useTheme } from "@mui/material";
import {ResponsiveBar} from "@nivo/bar";
import {tokens} from "../theme";


function Barchart({isDashboard=false, unite, finDeVie, usage, fabrication, distribution}) {

    var data = [
        {
          criteres: unite[0] === undefined? 'loading' :`${unite[0]}`,
          Manufacturing: parseInt(fabrication[0]),
          ManufacturingColor: "hsl(229, 70%, 50%)",
          Transportation: parseInt(distribution[0]),
          TransportationColor: "hsl(296, 70%, 50%)",
          Using: parseInt(usage[0]),
          UsingColor: "hsl(97, 70%, 50%)",
          "End of Life": parseInt(finDeVie[0]),
          "End of LifeColor": "hsl(340, 70%, 50%)",
        },
        {
          criteres: unite[1] === undefined? 'loading' :`*e10-7 ${unite[1]}`,
          Manufacturing: parseInt(fabrication[1]*10000000),
          ManufacturingColor: "hsl(307, 70%, 50%)",
          Transportation: parseInt(distribution[1]*10000000),
          TransportationColor: "hsl(111, 70%, 50%)",
          Using: parseInt(usage[1]*10000000),
          UsingColor: "hsl(273, 70%, 50%)",
          "End of Life": parseInt(finDeVie[1]*10000000),
          "End of LifeColor": "hsl(275, 70%, 50%)",
        },
        {
          criteres: unite[2] === undefined? 'loading' :`${unite[2]}`,
          Manufacturing: parseInt(fabrication[2]),
          ManufacturingColor: "hsl(72, 70%, 50%)",
          Transportation: parseInt(distribution[2]),
          TransportationColor: "hsl(96, 70%, 50%)",
          Using: parseInt(usage[2]),
          UsingColor: "hsl(106, 70%, 50%)",
          "End of Life": parseInt(finDeVie[2]),
          "End of LifeColor": "hsl(256, 70%, 50%)",
        },
        {
          criteres: unite[3] === undefined? 'loading' :`*e10-2 ${unite[3]}`,
          Manufacturing: parseInt(fabrication[3]*100),
          ManufacturingColor: "hsl(257, 70%, 50%)",
          Transportation: parseInt(distribution[3]*100),
          TransportationColor: "hsl(326, 70%, 50%)",
          Using: parseInt(usage[3]*100),
          UsingColor: "hsl(110, 70%, 50%)",
          "End of Life": parseInt(finDeVie[3]*100),
          "End of LifeColor": "hsl(9, 70%, 50%)",
        },
        {
          criteres: unite[4] === undefined? 'loading' : `*e10-7 ${unite[4]}`,
          Manufacturing: parseInt(fabrication[4]*10000),
          ManufacturingColor: "hsl(190, 70%, 50%)",
          Transportation: parseInt(distribution[4]*10000),
          TransportationColor: "hsl(325, 70%, 50%)",
          Using: parseInt(usage[4]*10000),
          UsingColor: "hsl(54, 70%, 50%)",
          "End of Life": parseInt(finDeVie[4]*10000),
          "End of LifeColor": "hsl(285, 70%, 50%)",
        },
        
      ];

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <ResponsiveBar
        data={data}
        valueScale={{ type: 'symlog' }}
        groupMode='grouped'
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
            'Manufacturing',
            'Transportation',
            'Using',
            'End of Life'
        ]}
        indexBy="criteres"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.1}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'paired' }}
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
    );
  }
  
  export default Barchart;