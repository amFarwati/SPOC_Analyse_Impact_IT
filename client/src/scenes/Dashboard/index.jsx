import { useState, createContext, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "../../components/Header";
import AlertDialog from "../../components/AlertDialogSlide";
import { tokens } from "../../theme";
import Linechart from "../../components/Linechart";
import Barchart from "../../components/Barchart";
import Piechart from "../../components/Piechart";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import AirIcon from "@mui/icons-material/Air";
import MasksIcon from "@mui/icons-material/Masks";
import WifiIcon from "@mui/icons-material/Wifi";
import WaterIcon from "@mui/icons-material/Water";
import FactoryIcon from "@mui/icons-material/Factory";
import InputFileUpload from "../../components/InputFileUpload";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import axios from "redaxios";
import * as React from "react";

export const User_Context = createContext();

function Dashboard({
  token,
  user,
  baseUrl,
  userParc,
  setUserParc,
  onLoad,
  setOnLoad,
  use,
  setUse,
  fab,
  setFab,
  distrib,
  setDistrib,
  fin,
  setFin,
  annualCost,
  setAnnualCost,
  unite,
  setUnite,
  nbItem,
  setNbItem,
  nbItemEnService,
  setNbItemEnService,
  annee,
  setAnnee,
  critere,
  setCritere,
  etape,
  setEtape,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isUpload, setIsUpload] = useState(false);
  const [open, setOpen] = useState(false);

  token = encodeURIComponent(token);

  const chartColor = [
    "#329D9C",
    "#56C596",
    "#7BE495",
    colors.lightLimeAccent[400],
  ];

  const formatageCout = (coutJSON) => {
    setUse(coutJSON.UTILISATION);
    setFab(coutJSON.FABRICATION);
    setDistrib(coutJSON.DISTRIBUTION);
    setFin(coutJSON.FIN_DE_VIE);
  };

  const handleImpactRequest = () => {
    setOnLoad(true);
    setAnnee(-1);
    console.log(`UserParc =>`, userParc);
    console.log(`/getImpact ${baseUrl} ${user} =>`);

    let data = { type: 1 };

    axios
      .get(`${baseUrl}/getLastImpact/${user}/${data.type}/${token}`, {
        withCredentials: true,
      })
      .then((res) => {
        // Vérification si la requête a réussi (statut 200-299)
        if (!res.ok) {
          throw new Error(`Erreur HTTP! Statut: ${res.status}`);
        } else if (res.data === `No push for this user`) {
          setOpen(true);
          setOnLoad(null);
        } else {
          // Manipulation des données
          console.log(res.data);

          let annees = Object.keys(res.data.cost);

          formatageCout(res.data.cost[annees[annees.length - 1]]);
          setAnnualCost(res.data.cost);
          setUnite(res.data.unite);
          setNbItem(res.data.nbItem);
          setNbItemEnService(res.data.nbItemEnService);
          setOnLoad(false);
        }
      })
      .catch((error) => {
        // Gestion des erreurs
        console.error("Erreur de redaxios:", error.message);
        setOnLoad(false);
      });
  };

  useEffect(() => {
    if (userParc.length !== 0 && isUpload) {
      setIsUpload(false);
      setOnLoad(true);
      console.log(`UserParc =>`, userParc);
      console.log(`/setInventory ${baseUrl} ${user}_test =>`);

      let data = { user: `${user}`, inventory: userParc, type: 1 };
      console.log(data);

      axios
        .put(`${baseUrl}/setInventory/${user}/${token}`, data, {
          withCredentials: true,
          "Content-Type": "application/json",
        })
        .then((res) => {
          // Vérification si la requête a réussi (statut 200-299)
          if (!res.ok) {
            throw new Error(`Erreur HTTP! Statut: ${res.status}`);
          }
          // Manipulation des données

          console.log(`/getImpact ${baseUrl} ${user} =>`);
          axios
            .get(`${baseUrl}/getImpact/${user}/${data.type}/${token}`, {
              withCredentials: true,
            })
            .then((res) => {
              // Vérification si la requête a réussi (statut 200-299)
              if (!res.ok) {
                throw new Error(`Erreur HTTP! Statut: ${res.status}`);
              }
              // Manipulation des données
              console.log(res.data);

              let annees = Object.keys(res.data.cost);

              formatageCout(res.data.cost[annees[annees.length - 1]]);
              setAnnee(annees[annees.length - 1]);
              setAnnualCost(res.data.cost);
              setUnite(res.data.unite);
              setNbItem(res.data.nbItem);
              setNbItemEnService(res.data.nbItemEnService);
              setOnLoad(false);
            })
            .catch((error) => {
              // Gestion des erreurs
              console.error("Erreur de redaxios:", error.message);
              setOnLoad(false);
            });
        })
        .catch((error) => {
          // Gestion des erreurs
          console.error("Erreur de redaxios:", error.message);
          setOnLoad(false);
        });
    }
  }, [userParc, baseUrl, user, isUpload]);

  useEffect(() => {
    if (annee !== -1) {
      formatageCout(annualCost[annee]);
    }
  }, [annee]);

  useEffect(() => {
    console.log(critere);
  }, [critere]);

  return (
    <User_Context.Provider value={[userParc, setUserParc, user]}>
      <Box ml={2} mr={2} height="86vh">
        <AlertDialog
          msg="Veuillez charger une premiere fois un inventaire"
          open={open}
          setOpen={setOpen}
        />
        {onLoad ? (
          <></>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width={1000}
            >
              <InputFileUpload setIsUpload={setIsUpload} />
              <Button
                component="label"
                sx={{
                  backgroundColor: colors.blueAccent[800],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
                onClick={handleImpactRequest}
                startIcon={<RestartAltRoundedIcon sx={{ mr: "10px" }} />}
              >
                Charger le dernier inventaire
              </Button>
              <Button
                component="label"
                sx={{
                  backgroundColor: colors.greenAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
                startIcon={<DownloadOutlinedIcon sx={{ mr: "10px" }} />}
                onClick={() => window.open("./Modèle_de_demo.ods", "_blank")}
                title="Téléchargement d'un modèle de demo"
              >
                Modèle de démo
              </Button>
            </Box>
          </Box>
        )}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Bienvenue sur votre Dashboard" />
        </Box>
        <br />

        {/*GRID and charts*/}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12,1fr)"
          gridTemplateRows="repeat(12,1fr)"
          gap="15px"
          margin="0 20px 0 20px"
          height="85%"
        >
          {/*ROW 1*/}
          <Box
            gridColumn="span 3"
            gridRow="span 5"
            backgroundColor={colors.primary[400]}
            borderRadius="20px"
          >
            <br />
            <Box p="0 30px">
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Répartition
              </Typography>
            </Box>
            {onLoad === null ? (
              <Box
                display="flex"
                justifyContent="center"
                height="89%"
                width="100%"
              >
                <Skeleton variant="circular" width={200} height={200} />
              </Box>
            ) : onLoad ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="89%"
              >
                <CircularProgress fontSize="large" color="success" />
              </Box>
            ) : (
              <Box height="89%">
                <Piechart
                  unite={unite}
                  finDeVie={fin}
                  usage={use}
                  fabrication={fab}
                  distribution={distrib}
                  critere={critere}
                  annee={
                    annee === -1
                      ? Object.keys(annualCost)[
                          Object.keys(annualCost).length - 1
                        ]
                      : annee
                  }
                  color={chartColor}
                />
              </Box>
            )}
          </Box>
          <Box
            gridColumn="span 9"
            gridRow="span 6"
            backgroundColor={colors.primary[400]}
            borderRadius="20px"
          >
            <br />
            <Box p="0 30px">
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Etape ACV
              </Typography>
            </Box>
            {onLoad === null ? (
              <Box
                height="75%"
                justifyContent="center"
                alignItems="center"
                display="flex"
                flexDirection="column"
                mb="20px"
              >
                <br />
                <Skeleton variant="rounded" width="95%" height="80%" />
                <br />
                <Skeleton variant="rounded" width="95%" height="20%" />
              </Box>
            ) : onLoad ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <CircularProgress fontSize="large" color="success" />
              </Box>
            ) : (
              <Box height="70%">
                <Barchart
                  isDashboard={true}
                  unite={unite}
                  finDeVie={fin}
                  usage={use}
                  fabrication={fab}
                  distribution={distrib}
                  annee={
                    annee === -1
                      ? Object.keys(annualCost)[
                          Object.keys(annualCost).length - 1
                        ]
                      : annee
                  }
                  setCritere={setCritere}
                  color={chartColor}
                />
              </Box>
            )}
          </Box>
          <Box
            gridColumn="span 3"
            gridRow="span 7"
            backgroundColor={colors.primary[400]}
            borderRadius="20px"
          >
            <br />
            <Box p="0 30px">
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Paramètrage
              </Typography>
            </Box>

            {onLoad === null ? (
              <>
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <Stack spacing={1}>
                    <Skeleton variant="rounded" height="50px" />
                    <Skeleton variant="rounded" height="50px" />
                    <Skeleton variant="rounded" height="50px" />
                    <br />
                    <Skeleton variant="rounded" width="100%">
                      <Typography>.</Typography>
                    </Skeleton>
                    <Skeleton variant="rounded" width="100%">
                      <Typography>.</Typography>
                    </Skeleton>
                  </Stack>
                </Box>
              </>
            ) : onLoad ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <CircularProgress fontSize="large" color="success" />
              </Box>
            ) : (
              <Box
              height="90%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  display="flex"
                  justifyContent="space-around"
                  alignItems="center"
                  height="90%"
                  width="95%"
                  flexDirection="column"
                >
                  <Box width="100%">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Critère
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Critere"
                        defaultValue={0}
                        value={critere}
                      >
                        <MenuItem
                          value={0}
                          onClick={() => {
                            setCritere(0);
                          }}
                        >
                          <AirIcon /> Changement climatique{" "}
                        </MenuItem>
                        <MenuItem
                          value={1}
                          onClick={() => {
                            setCritere(1);
                          }}
                        >
                          <MasksIcon /> Particules fines
                        </MenuItem>
                        <MenuItem
                          value={2}
                          onClick={() => {
                            setCritere(2);
                          }}
                        >
                          <WifiIcon /> Radiation ionisante
                        </MenuItem>
                        <MenuItem
                          value={3}
                          onClick={() => {
                            setCritere(3);
                          }}
                        >
                          <WaterIcon /> Acidification
                        </MenuItem>
                        <MenuItem
                          value={4}
                          onClick={() => {
                            setCritere(4);
                          }}
                        >
                          <FactoryIcon /> Usage des ressources (mineraux et
                          metaux)
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box width="100%">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Etape ACV
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Etape_ACV"
                        defaultValue={0}
                        value={etape}
                      >
                        <MenuItem
                          value={0}
                          onClick={() => {
                            setEtape(0);
                          }}
                        >
                          {" "}
                          Fabrication{" "}
                        </MenuItem>
                        <MenuItem
                          value={1}
                          onClick={() => {
                            setEtape(1);
                          }}
                        >
                          {" "}
                          Distribution
                        </MenuItem>
                        <MenuItem
                          value={2}
                          onClick={() => {
                            setEtape(2);
                          }}
                        >
                          {" "}
                          Usage
                        </MenuItem>
                        <MenuItem
                          value={3}
                          onClick={() => {
                            setEtape(3);
                          }}
                        >
                          {" "}
                          Fin de vie
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box width="100%">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Année
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Année"
                        defaultValue={Object.keys(annualCost).length - 1}
                      >
                        {Object.keys(annualCost).map((an) => {
                          return (
                            <MenuItem
                              value={Object.keys(annualCost).indexOf(an)}
                              onClick={() => {
                                setAnnee(an);
                              }}
                            >
                              {" "}
                              {an}{" "}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >
                      Nombre de matériel IT : {nbItem}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >
                      Nombre de matériel IT En Service : {nbItemEnService}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          <Box
            gridColumn="span 9"
            gridRow="span 6"
            backgroundColor={colors.primary[400]}
            borderRadius="20px"
          >
            <br />
            <Box p="0 30px">
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Suivi
              </Typography>
            </Box>
            {onLoad === null ? (
              <Box
                height="80%"
                justifyContent="center"
                alignItems="center"
                display="flex"
                flexDirection="column"
              >
                <Skeleton variant="rounded" height="95%" width="95%" />
              </Box>
            ) : onLoad ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <CircularProgress fontSize="large" color="success" />
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="80%"
                width="100%"
              >
                <Linechart
                  isDashboard={true}
                  annualCost={annualCost}
                  critere={critere}
                  etapeACV={etape}
                  color={chartColor}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </User_Context.Provider>
  );
}

export default Dashboard;
