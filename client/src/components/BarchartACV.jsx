import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme.js";
import InfoButton from "./InfoButton.jsx";
import AirIcon from "@mui/icons-material/Air";
import MasksIcon from "@mui/icons-material/Masks";
import WifiIcon from "@mui/icons-material/Wifi";
import WaterIcon from "@mui/icons-material/Water";
import FactoryIcon from "@mui/icons-material/Factory";

function BarchartACV({
  finDeVie,
  usage,
  fabrication,
  distribution,
  annee,
  critere,
  color,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [graph_Type, setGraphType] = React.useState("linear");

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const iconSize = "40px";

  var total =
    fabrication[critere] +
    distribution[critere] +
    usage[critere] +
    finDeVie[critere];

  var data = [
    {
      criteres: "%",
      Fabrication:
        fabrication[critere] === undefined
          ? 0
          : parseInt((fabrication[critere] * 10000) / total) / 100,
      FabricationColor: "hsl(229, 70%, 50%)",
      Distribution:
        distribution[critere] === undefined
          ? 0
          : parseInt((distribution[critere] * 10000) / total) / 100,
      DistributionColor: "hsl(296, 70%, 50%)",
      Utilisation:
        usage[critere] === undefined
          ? 0
          : parseInt((usage[critere] * 10000) / total) / 100,
      UtilisationColor: "hsl(97, 70%, 50%)",
      "Fin de vie":
        finDeVie[critere] === undefined
          ? 0
          : parseInt((finDeVie[critere] * 10000) / total) / 100,
      "Fin de vieColor": "hsl(340, 70%, 50%)",
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

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box height="100%" width="100%" display="flex" flexDirection="column">
      <Box display="flex" ml={4} alignItems="center">
        {infoCritere()}
        <Typography variant="h5">{annee}</Typography>
      </Box>
      <Box height="50%">
        <ResponsiveBar
          data={data}
          valueScale={{ type: graph_Type }}
          groupMode="stacked"
          layout="horizontal"
          maxValue={100}
          theme={{
            text: {
              fill: colors.grey[100],
              fontSize: "14px",
            },
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                  fontSize: "15px",
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
                fontSize: "0.9vw",
              },
            },
          }}
          keys={["Fabrication", "Distribution", "Utilisation", "Fin de vie"]}
          indexBy="criteres"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.1}
          indexScale={{ type: "band", round: true }}
          colors={color}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 5,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickValues: 1,
            tickPadding: 5,
            tickRotation: 0,
            legend: "répartition (%)",
            legendPosition: "middle",
            legendOffset: 32,
            truncateTickAt: 0,
          }}
          labelSkipWidth={30}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 110,
              translateY: 0,
              itemsSpacing: 14,
              itemWidth: 100,
              itemHeight: 3,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 10,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={(e) =>
            e.id + ": " + e.formattedValue + " in criteres: " + e.indexValue
          }
        />
      </Box>
    </Box>
  );
}

export default BarchartACV;
