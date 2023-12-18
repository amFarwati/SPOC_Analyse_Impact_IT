import { useTheme } from "@mui/material";
import {ResponsivePie} from "@nivo/pie";
import {tokens} from "../theme";
//import {mockPieData as data} from "../data/mockData";


function Piechart({unite, finDeVie, usage, fabrication, distribution, critere}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    var total = fabrication[critere]+distribution[critere]+usage[critere]+finDeVie[critere]

    var data = [
        {
          id: "Manufacturing",
          label: "Manufacturing",
          value: fabrication[critere] === undefined? 0:parseInt(fabrication[critere]*100/total),
          color: "hsl(104, 70%, 50%)",
        },
        {
          id: "Transportation",
          label: "Transportation",
          value: distribution[critere] === undefined? 0:parseInt(distribution[critere]*100/total),
          color: "hsl(162, 70%, 50%)",
        },
        {
          id: "Using",
          label: "Using",
          value: usage[critere] === undefined? 0:parseInt(usage[critere]*100/total),
          color: "hsl(291, 70%, 50%)",
        },
        {
          id: "End of Life",
          label: "End of Life",
          value: finDeVie[critere] === undefined? 0:parseInt(finDeVie[critere]*100/total),
          color: "hsl(229, 70%, 50%)",
        },
        
      ];

    return(
        <ResponsivePie
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
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={6}
        activeOuterRadiusOffset={8}
        colors={{scheme: 'yellow_green_blue'}}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={0}
        arcLinkLabelsTextColor= {colors.grey[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={0}
        arcLinkLabelsTextOffset={30}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        legends={[]}
    />

    );
  }
  
  export default Piechart;