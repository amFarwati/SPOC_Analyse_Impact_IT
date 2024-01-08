import { useTheme } from "@mui/material";
import {ResponsiveLine} from "@nivo/line";
import {tokens} from "../theme";



function Linechart({isDashboard=false, annualCost, critere}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    console.log(annualCost);

    const handleData = (data) =>{
        let annees = Object.keys(data);
        let ids = Object.keys(data[annees[0]]);
        let criteres = Object.keys(data[annees[0]][ids[0]]);

        let colors = [  tokens("dark").greenAccent[500],
                        tokens("dark").blueAccent[300],
                        tokens("dark").redAccent[200],
                        tokens("dark").redAccent[200],
                        ];
        let res = [];

        for (let j = 0; j<criteres.length; j++) {
            let interm = [];

            console.log(critere);

            for(let i = 0; i<ids.length; i++){
                interm.push({  id : ids[i],
                            color : colors[i],
                            data : annees.map(annee => {
                                let y = 0;
                                switch (critere){
                                    case 0:
                                        y = data[annee][ids[i]][criteres[j]]<0.1?0:data[annee][ids[i]][criteres[j]];
                                    break
                                    case 1:
                                        y = data[annee][ids[i]][criteres[j]]//*10000;
                                    break
                                    case 2:
                                        y = data[annee][ids[i]][criteres[j]]<0.1?0:data[annee][ids[i]][criteres[j]];
                                    break
                                    case 3:
                                        y = data[annee][ids[i]][criteres[j]]<0.1?0:data[annee][ids[i]][criteres[j]];
                                    break
                                    case 4:
                                        y = data[annee][ids[i]][criteres[j]]<0.1?0:data[annee][ids[i]][criteres[j]]//*100;
                                    break
                                    default:
                                        y = 0;
                                    break;
                                }

                                return {x: annee,
                                        y: y
                                    }
                            })
                            }
                        );
            };
            res.push(interm);
        }
        console.log(res)
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
        data={data.length===1?data:data[critere]}
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
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={0}
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