import { Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import InfoButton from "./InfoButton.jsx";
import Box from "@mui/material/Box";
import AirIcon from "@mui/icons-material/Air";
import MasksIcon from "@mui/icons-material/Masks";
import WifiIcon from "@mui/icons-material/Wifi";
import WaterIcon from "@mui/icons-material/Water";
import FactoryIcon from "@mui/icons-material/Factory";

function Piechart({
  unite,
  finDeVie,
  usage,
  fabrication,
  distribution,
  critere,
  annee,
  color,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const iconSize = "40px";

  var total =
    fabrication[critere] +
    distribution[critere] +
    usage[critere] +
    finDeVie[critere];

  var data = [
    {
      id: "Fabrication",
      label: "Fabrication",
      value:
        fabrication[critere] === undefined
          ? 0
          : parseInt((fabrication[critere] * 100) / total),
      color: "hsl(190, 70%, 50%)",
    },
    {
      id: "Distribution",
      label: "Distribution",
      value:
        distribution[critere] === undefined
          ? 0
          : parseInt((distribution[critere] * 100) / total),
      color: "hsl(325, 70%, 50%)",
    },
    {
      id: "Utilisation",
      label: "Utilisation",
      value:
        usage[critere] === undefined
          ? 0
          : parseInt((usage[critere] * 100) / total),
      color: "hsl(54, 70%, 50%)",
    },
    {
      id: "Fin de vie",
      label: "Fin de vie",
      value:
        finDeVie[critere] === undefined
          ? 0
          : parseInt((finDeVie[critere] * 100) / total),
      color: "hsl(285, 70%, 50%)",
    },
  ];

  const infoCritere = () => {
    let res = null;

    switch (critere) {
      case 0:
        res = (
          <InfoButton
            title={<AirIcon style={{ fontSize: iconSize }} />}
            info={`Changement Climatique`}
          />
        );
        break;
      case 1:
        res = (
          <InfoButton
            title={<MasksIcon style={{ fontSize: iconSize }} />}
            info={`Particules fines`}
          />
        );
        break;
      case 2:
        res = (
          <InfoButton
            title={<WifiIcon style={{ fontSize: iconSize }} />}
            info={`Radiations ionisantes`}
          />
        );
        break;
      case 3:
        res = (
          <InfoButton
            title={<WaterIcon style={{ fontSize: iconSize }} />}
            info={`Acidification`}
          />
        );
        break;
      case 4:
        res = (
          <InfoButton
            title={<FactoryIcon style={{ fontSize: iconSize }} />}
            info={`Usage des ressources\n(mineraux et metaux)`}
          />
        );
        break;
      default:
        res = (
          <InfoButton
            title={<AirIcon style={{ fontSize: iconSize }} />}
            info={`Changement Climatique`}
          />
        );
        break;
    }
    return res;
  };

  return (
    <>
      <Box display="flex" ml={4} alignItems="center">
        {infoCritere()}
        <Typography variant="h5">{annee}</Typography>
      </Box>
      <ResponsivePie
        data={data}  
        margin={{ top: 40, right: 50, bottom: 90, left: 50 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={6}
        activeOuterRadiusOffset={8}
        colors={color}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={1}
        arcLinkLabelsOffset={10}
        arcLinkLabelsDiagonalLength={5}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        theme={{
          text: {
            fill: colors.grey[100],
            fontSize: "16px",
          },
          axis: {
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
            },
          },
        }}
      />
    </>
  );
}

export default Piechart;
