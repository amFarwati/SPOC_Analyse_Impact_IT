import { useTheme } from "@mui/material";
import {ResponsivePie} from "@nivo/pie";
import {tokens} from "../theme";
import {mockPieData as data} from "../data/mockData";


function Piechart() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);



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
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'nivo' }}
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
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor= {colors.grey[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
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