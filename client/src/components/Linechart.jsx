import { useTheme, Typography } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { tokens } from "../theme";
import InfoButton from "./InfoButton.jsx";
import Box from "@mui/material/Box";
import AirIcon from "@mui/icons-material/Air";
import MasksIcon from "@mui/icons-material/Masks";
import WifiIcon from "@mui/icons-material/Wifi";
import WaterIcon from "@mui/icons-material/Water";
import FactoryIcon from "@mui/icons-material/Factory";

function Linechart({
  isDashboard = false,
  annualCost,
  critere,
  etapeACV,
  color,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const iconSize = "40px";
  let acv_coeff = [];

  const handleData = (data) => {
    let annees = Object.keys(data);
    let acv = Object.keys(data[annees[0]]);
    let criteres = Object.keys(data[annees[0]][acv[0]]);
    let res = [];

    for (let j = 0; j < criteres.length; j++) {
      let interm = [];
      acv_coeff[j] = [];

      for (let i = 0; i < acv.length; i++) {
        acv_coeff[j][i] = 100000;

        annees.forEach((annee) => {
          if (
            acv_coeff[j][i] >
            Math.floor(Math.log10(data[annee][acv[i]][criteres[j]]))
          ) {
            acv_coeff[j][i] = Math.floor(
              Math.log10(data[annee][acv[i]][criteres[j]])
            );
          }
        });
        console.log("acv",acv)
        interm.push({
          id: acv[i],
          data: annees.map((annee) => {
            console.log(
              annee,
              acv[i],
              criteres[j],
              data[annee][acv[i]][criteres[j]],
              10 ** acv_coeff[j][i],
              data[annee][acv[i]][criteres[j]] / 10 ** acv_coeff[j][i],
              parseInt(data[annee][acv[i]][criteres[j]]*100 / 10 ** acv_coeff[j][i])/100
            );
            return {
              x: annee,
              y: parseInt(data[annee][acv[i]][criteres[j]]*100 / 10 ** acv_coeff[j][i])/100,
            };
          }),
        });
      }
      res.push(interm);
    }

    console.log("acv_coeff", acv_coeff);
    return res;
  };

  var data =
    annualCost === null
      ? [{ id: "loading", data: [{ x: 0, y: 0 }] }]
      : handleData(annualCost);

  const infoCritere = () => {
    let res = null;

    switch (critere) {
      case 0:
        res = (
          <InfoButton
            title={<AirIcon style={{ fontSize: iconSize }} />}
            info={`Changement Climatique\n e${acv_coeff[critere][acvMapping(etapeACV)]} kg eq CO2`}
          />
        );
        break;
      case 1:
        res = (
          <InfoButton
            title={<MasksIcon style={{ fontSize: iconSize }} />}
            info={`Particules fines\n e${acv_coeff[critere][acvMapping(etapeACV)]} incidence maladie`}
          />
        );
        break;
      case 2:
        res = (
          <InfoButton
            title={<WifiIcon style={{ fontSize: iconSize }} />}
            info={`Radiations ionisantes\n e${acv_coeff[critere][acvMapping(etapeACV)]} kBq U-235 eq`}
          />
        );
        break;
      case 3:
        res = (
          <InfoButton
            title={<WaterIcon style={{ fontSize: iconSize }} />}
            info={`Acidification\n e${acv_coeff[critere][acvMapping(etapeACV)]} mol H+ eq`}
          />
        );
        break;
      case 4:
        res = (
          <InfoButton
            title={<FactoryIcon style={{ fontSize: iconSize }} />}
            info={`Usage des ressources\n(mineraux et metaux)\n e${acv_coeff[critere][acvMapping(etapeACV)]} kg Sb eq`}
          />
        );
        break;
      default:
        res = (
          <InfoButton
            title={<AirIcon style={{ fontSize: iconSize }} />}
            info={`Changement Climatique\n e${acv_coeff[critere][acvMapping(etapeACV)]} kg eq CO2`}
          />
        );
        break;
    }
    return res;
  };

  const infoACV = () => {
    let res = null;

    switch (etapeACV) {
      case 0:
        res = "Fabrication";
        break;
      case 1:
        res = "Distribution";
        break;
      case 2:
        res = "Usage";
        break;
      case 3:
        res = "Fin de vie";
        break;
      default:
        res = "";
        break;
    }
    return res;
  };

  const acvMapping = () => {
    let res = null;

    switch (etapeACV) {
      case 0:
        res = 1;
        break;
      case 1:
        res = 3;
        break;
      case 2:
        res = 2;
        break;
      case 3:
        res = 0;
        break;
      default:
        res = 0;
        break;
    }
    return res;
  };

  console.log("data", data);

  return (
    <Box Box height="100%" width="95%">
      <Box display="flex" ml={4} alignItems="center">
        {infoCritere()}
        <Typography variant="h5">{infoACV()}</Typography>
      </Box>
      <Box height="80%">
        <ResponsiveLine
          data={data.length === 1 ? data : [data[critere][acvMapping(etapeACV)]]}
          margin={{ top: 20, right: 50, bottom: 30, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "0",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          colors={color[etapeACV]}
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
            tickValues: 5,
            tickRotation: 0,
          }}
          tooltip={(tooltip) => {
            return (
              <div
                style={{
                  background: colors.grey[800], // Changer cette couleur en fonction de vos besoins
                  padding: "9px",
                  borderRadius: "3px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
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
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={0}
          useMesh={true}
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
                fontSize: "18px",
              },
            },
          }}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: -60,
              translateY: -300,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0.5)",
              itemTextColor: colors.grey[100],
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </Box>
  );
}

export default Linechart;
