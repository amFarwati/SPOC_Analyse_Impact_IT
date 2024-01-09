import { useTheme } from "@mui/material";
import {ResponsivePie} from "@nivo/pie";
import {tokens} from "../theme";
import InfoButton from "./infoButton";
import Box from '@mui/material/Box';
import AirIcon from '@mui/icons-material/Air';
import MasksIcon from '@mui/icons-material/Masks';
import WifiIcon from '@mui/icons-material/Wifi';
import WaterIcon from '@mui/icons-material/Water';
import FactoryIcon from '@mui/icons-material/Factory';


function Piechart({unite, finDeVie, usage, fabrication, distribution, critere, color}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    var total = fabrication[critere]+distribution[critere]+usage[critere]+finDeVie[critere]

    var data = [
        {
          id: "Fabrication",
          label: "Fabrication",
          value: fabrication[critere] === undefined? 0:parseInt(fabrication[critere]*100/total),
          color: "hsl(190, 70%, 50%)",
        },
        {
          id: "Distribution",
          label: "Distribution",
          value: distribution[critere] === undefined? 0:parseInt(distribution[critere]*100/total),
          color: "hsl(325, 70%, 50%)",
        },
        {
          id: "Utilisation",
          label: "Utilisation",
          value: usage[critere] === undefined? 0:parseInt(usage[critere]*100/total),
          color: "hsl(54, 70%, 50%)",
        },
        {
          id: "Fin de vie",
          label: "Fin de vie",
          value: finDeVie[critere] === undefined? 0:parseInt(finDeVie[critere]*100/total),
          color: "hsl(285, 70%, 50%)",
        },
        
      ];

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

    return(
        <Box height = "90%" >
            {infoCritere()}
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
            colors={{scheme: color}}
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
            arcLinkLabelsSkipAngle={1}
            arcLinkLabelsTextColor= {colors.grey[100]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={1}
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
        </Box>
    );
  }
  
  export default Piechart;