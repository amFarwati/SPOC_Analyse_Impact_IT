import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import InfoButton from "./InfoButton.jsx";
import AirIcon from "@mui/icons-material/Air";
import MasksIcon from "@mui/icons-material/Masks";
import WifiIcon from "@mui/icons-material/Wifi";
import WaterIcon from "@mui/icons-material/Water";
import FactoryIcon from "@mui/icons-material/Factory";

function Barchart({
  isDashboard = false,
  unite,
  finDeVie,
  usage,
  fabrication,
  distribution,
  annee,
  setCritere,
  color,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [graph_Type, setGraphType] = React.useState("symlog");

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  var data = [
    {
      criteres: "      ",
      Fabrication: parseInt(fabrication[0]),
      FabricationColor: "hsl(229, 70%, 50%)",
      Distribution: parseInt(distribution[0]),
      DistributionColor: "hsl(296, 70%, 50%)",
      Utilisation: parseInt(usage[0]),
      UtilisationColor: "hsl(97, 70%, 50%)",
      "Fin de vie": parseInt(finDeVie[0]),
      "Fin de vieColor": "hsl(340, 70%, 50%)",
    },
    {
      criteres: "     ",
      Fabrication: parseInt(fabrication[1] * 10000000),
      FabricationColor: "hsl(307, 70%, 50%)",
      Distribution: parseInt(distribution[1] * 10000000),
      DistributionColor: "hsl(111, 70%, 50%)",
      Utilisation: parseInt(usage[1] * 10000000),
      UtilisationColor: "hsl(273, 70%, 50%)",
      "Fin de vie": parseInt(finDeVie[1] * 10000000),
      "Fin de vieColor": "hsl(275, 70%, 50%)",
    },
    {
      criteres: " ",
      Fabrication: parseInt(fabrication[2]),
      FabricationColor: "hsl(72, 70%, 50%)",
      Distribution: parseInt(distribution[2]),
      DistributionColor: "hsl(96, 70%, 50%)",
      Utilisation: parseInt(usage[2]),
      UtilisationColor: "hsl(106, 70%, 50%)",
      "Fin de vie": parseInt(finDeVie[2]),
      "Fin de vieColor": "hsl(256, 70%, 50%)",
    },
    {
      criteres: "  ",
      Fabrication: parseInt(fabrication[3] * 100),
      FabricationColor: "hsl(257, 70%, 50%)",
      Distribution: parseInt(distribution[3] * 100),
      DistributionColor: "hsl(326, 70%, 50%)",
      Utilisation: parseInt(usage[3] * 100),
      UtilisationColor: "hsl(110, 70%, 50%)",
      "Fin de vie": parseInt(finDeVie[3] * 100),
      "Fin de vieColor": "hsl(9, 70%, 50%)",
    },
    {
      criteres: "   ",
      Fabrication: parseInt(fabrication[4] * 10000),
      FabricationColor: "hsl(190, 70%, 50%)",
      Distribution: parseInt(distribution[4] * 10000),
      DistributionColor: "hsl(325, 70%, 50%)",
      Utilisation: parseInt(usage[4] * 10000),
      UtilisationColor: "hsl(54, 70%, 50%)",
      "Fin de vie": parseInt(finDeVie[4] * 10000),
      "Fin de vieColor": "hsl(285, 70%, 50%)",
    },
  ];

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box height="100%" width="100%" display="flex" flexDirection="column">
      <Box height="85%">
        <ResponsiveBar
          data={data}
          valueScale={{ type: graph_Type }}
          groupMode="grouped"
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
                  fontSize: "15px",
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                  fontSize: "12px",
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
                fontSize: "18px",
              },
            },
          }}
          keys={["Fabrication", "Distribution", "Utilisation", "Fin de vie"]}
          indexBy="criteres"
          margin={{ top: 10, right: 130, bottom: 10, left: 70 }}
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
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: 32,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickValues: 3,
            tickPadding: 5,
            tickRotation: 0,
            legend: "impact",
            legendPosition: "middle",
            legendOffset: -40,
            truncateTickAt: 0,
          }}
          labelSkipWidth={12}
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
              itemsSpacing: 10,
              itemWidth: 100,
              itemHeight: 10,
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
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          ml={9}
          mr={18}
        >
          <InfoButton
            onChange={() => setCritere(0)}
            title={<AirIcon style={{ fontSize: "5vh" }} />}
            info={`Changement Climatique\n${unite[0]}`}
          />
          <InfoButton
            onChange={() => setCritere(1)}
            title={<MasksIcon style={{ fontSize: "5vh" }} />}
            info={`Particules fines\n*e10-7 ${unite[1]}`}
          />
          <InfoButton
            onChange={() => setCritere(2)}
            title={<WifiIcon style={{ fontSize: "5vh" }} />}
            info={`Radiations ionisantes\n${unite[2]}`}
          />
          <InfoButton
            onChange={() => setCritere(3)}
            title={<WaterIcon style={{ fontSize: "5vh" }} />}
            info={`Acidification\n*e10-2 ${unite[3]}`}
          />
          <InfoButton
            onChange={() => setCritere(4)}
            title={<FactoryIcon style={{ fontSize: "5vh" }} />}
            info={`Usage des ressources\n(mineraux et metaux)\n*e10-7 ${unite[4]}`}
          />
        </Box>
    </Box>
  );
}

export default Barchart;
