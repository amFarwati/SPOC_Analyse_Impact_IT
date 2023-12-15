import { useTheme } from "@mui/material";
import {ResponsiveBar} from "@nivo/bar";
import {tokens} from "../theme";


function Barchart({isDashboard=false, unite, finDeVie, usage, fabrication, distribution}) {

    var data = [
        {
          criteres: "Climate change",
          Manufacturing: fabrication[0],
          ManufacturingColor: "hsl(229, 70%, 50%)",
          Transportation: distribution[0],
          TransportationColor: "hsl(296, 70%, 50%)",
          Using: usage[0],
          UsingColor: "hsl(97, 70%, 50%)",
          "End of Life": 0,
          "End of LifeColor": "hsl(340, 70%, 50%)",
        },
        {
          criteres: "Particulate matter and respiratory inorganics",
          Manufacturing: 0,
          ManufacturingColor: "hsl(307, 70%, 50%)",
          Transportation: 0,
          TransportationColor: "hsl(111, 70%, 50%)",
          Using: 0,
          UsingColor: "hsl(273, 70%, 50%)",
          "End of Life": 0,
          "End of LifeColor": "hsl(275, 70%, 50%)",
        },
        {
          criteres: "Ionising radiation",
          Manufacturing: 0,
          ManufacturingColor: "hsl(72, 70%, 50%)",
          Transportation: 0,
          TransportationColor: "hsl(96, 70%, 50%)",
          Using: 0,
          UsingColor: "hsl(106, 70%, 50%)",
          "End of Life": 0,
          "End of LifeColor": "hsl(256, 70%, 50%)",
        },
        {
          criteres: "Acidification",
          Manufacturing: 0,
          ManufacturingColor: "hsl(257, 70%, 50%)",
          Transportation: 0,
          TransportationColor: "hsl(326, 70%, 50%)",
          Using: 0,
          UsingColor: "hsl(110, 70%, 50%)",
          "End of Life": 0,
          "End of LifeColor": "hsl(9, 70%, 50%)",
        },
        {
          criteres: "Resource use (minerals and metals)",
          Manufacturing: 0,
          ManufacturingColor: "hsl(190, 70%, 50%)",
          Transportation: 0,
          TransportationColor: "hsl(325, 70%, 50%)",
          Using: 0,
          UsingColor: "hsl(54, 70%, 50%)",
          "End of Life": 0,
          "End of LifeColor": "hsl(285, 70%, 50%)",
        },
        
      ];

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <ResponsiveBar
        data={data}
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
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
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