import { useTheme } from "@mui/material";
import {ResponsiveLine} from "@nivo/line";
import {tokens} from "../theme";



function Linechart({isDashboard=false, annualCost}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    console.log(annualCost);

    const handleData = (data) =>{
        let annees = Object.keys(data);
        let ids = Object.keys(data[annees[0]]);
        console.log(ids);
        let colors = [  tokens("dark").greenAccent[500],
                        tokens("dark").blueAccent[300],
                        tokens("dark").redAccent[200],
                        tokens("dark").redAccent[200],
                        ];
        let res = [];

        for(let i = 0; i<ids.length; i++){
            res.push({  id : ids[i],
                        color : colors[i],
                        data : annees.map(annee => {
                            return {x: annee,
                                    y: data[annee][ids[i]]
                                    }
                        })
                        }
                    );
        };

        return res;
    }

    var data = (annualCost===null?[{  id : 'loading',
        color : tokens("dark").greenAccent[500],
        data :  [{   x: 0,
                    y: 0
                }]
        }]:handleData(annualCost));

    return (
        <ResponsiveLine
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
            tooltip:{
                container:{
                    color:colors.primary[500],
                }
            }
        }}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined :'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickValues: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined :'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        enableGridY={false}
        pointSize={5}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
       
    );
  }
  
  export default Linechart;