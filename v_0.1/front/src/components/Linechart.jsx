import { useTheme } from "@mui/material";
import {ResponsiveLine} from "@nivo/line";
import {tokens} from "../theme";
import InfoButton from "./infoButton";
import Box from '@mui/material/Box';
import AirIcon from '@mui/icons-material/Air';
import MasksIcon from '@mui/icons-material/Masks';
import WifiIcon from '@mui/icons-material/Wifi';
import WaterIcon from '@mui/icons-material/Water';
import FactoryIcon from '@mui/icons-material/Factory';



function Linechart({isDashboard=false, annualCost, critere, etapeACV, color}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    console.log('annualCost',annualCost);

    const handleData = (data) =>{
        let annees = Object.keys(data);
        let acv = Object.keys(data[annees[0]]);
        let criteres = Object.keys(data[annees[0]][acv[0]]);

        let colors = [  tokens("dark").greenAccent[500],
                        tokens("dark").blueAccent[300],
                        tokens("dark").redAccent[200],
                        tokens("dark").redAccent[200],
                        ];
        let res = [];

       for (let j = 0; j<criteres.length; j++) {
            let interm = [];

//           console.log(critere);

            for(let i = 0; i<acv.length; i++){
                interm.push({  id : acv[i],
                            color : '#38bcb2'/*colors[i]*/,
                            data : annees.map(annee => {
                                return {x: annee,
                                        y: data[annee][acv[i]][criteres[j]]
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

    const infoCritere = () => {
        let res = null; 
        
        switch (critere){
            case 0:
                res=<InfoButton title={<AirIcon fontSize='large'/>} info={`Changement Climatique`} />
            break
            case 1:
                res=<InfoButton title={<MasksIcon fontSize='large'/>} info={`Particules fines`} />
            break
            case 2:
                res=<InfoButton title={<WifiIcon fontSize='large'/>} info={`Radiations ionisantes`} />
            break
            case 3:
                res=<InfoButton title={<WaterIcon fontSize='large'/>} info={`Acidification`} />
            break
            case 4:
                res=<InfoButton title={<FactoryIcon fontSize='large'/>} info={`Usage des ressources\n(mineraux et metaux)`} />
            break
            default:
                res=<InfoButton title={<AirIcon fontSize='large'/>} info={`Changement Climatique`} />
            break;
        };
        return res;
    }; 

    return (
        <Box Box height="90%" >
            {infoCritere()}
            <ResponsiveLine
            data={data.length===1?data:[data[critere][etapeACV]]}
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
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
            }}
            tooltip={(tooltip) => {
                return (
                  <div
                    style={{
                      background: colors.grey[800], // Changer cette couleur en fonction de vos besoins
                      padding: '9px',
                      borderRadius: '3px',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                <strong>{tooltip.point.serieId}</strong>
                <br />
                <span style={{ color: tooltip.point.serieColor }}>
                    {tooltip.point.data.y}
                </span>
                <br />
                {tooltip.point.data.x}
                </div>
                );
              }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={0}
            useMesh={true}
            theme={{
                axis:{
                    domain:{
                        line:{
                            stroke:colors.grey[100],
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
            }}
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
                    symbolBorderColor: 'rgba(0, 0, 0.5)',
                    itemTextColor:colors.grey[100],
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
       </Box>
    );
  }
  
  export default Linechart;