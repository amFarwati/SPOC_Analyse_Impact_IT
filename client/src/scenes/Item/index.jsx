import {
  Box,
  Divider,
  useTheme,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "../../components/Header";
import Liste from "../../components/Liste";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import axios from "redaxios";
import "dayjs/locale/fr";
import Barchart from "../../components/Barchart";
import Piechart from "../../components/Piechart";
import CircularProgress from "@mui/material/CircularProgress";
import AirIcon from "@mui/icons-material/Air";
import MasksIcon from "@mui/icons-material/Masks";
import WifiIcon from "@mui/icons-material/Wifi";
import WaterIcon from "@mui/icons-material/Water";
import FactoryIcon from "@mui/icons-material/Factory";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import * as React from "react";

function Item({
  token,
  user,
  baseUrl,
  onLoad,
  setOnLoad,
  typeEquipement,
  setTypeEquipement,
  userParc,
  setUserParc,
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
  boxes,
  setBoxes,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [boxesChange, setBoxesChange] = useState(false);
  const [boxesEmpty, setBoxesEmpty] = useState(false);

  token = encodeURIComponent (token);

  const chartColor = [
    "#329D9C",
    "#56C596",
    "#7BE495",
    colors.lightLimeAccent[400],
  ];

  const formatageCout = (coutJSON) => {
    /*coutJSON tel que 
            FABRICATION : [0,0,0,0,0],
            DISTRIBUTION : [0,0,0,0,0],
            UTILISATION : [0,0,0,0,0],
            FIN_DE_VIE : [0,0,0,0,0]
        */
    setUse(coutJSON.UTILISATION);
    setFab(coutJSON.FABRICATION);
    setDistrib(coutJSON.DISTRIBUTION);
    setFin(coutJSON.FIN_DE_VIE);
  };

  const formatageUpData = (jsonContent) => {
    let itemList = [];
    jsonContent.forEach((item) => {
      let found = false;
      let counter = 0;

      if (
        !((item.type === "") | (item.date === "") | (item.quantity === NaN))
      ) {
        while ((found === false) & (counter < itemList.length)) {
          if (
            (itemList.length !== 0) &
            (itemList[counter].type === item.type) &
            (itemList[counter].dateDebut === item.date)
          ) {
            itemList[counter].quantity += parseInt(item.quantity);
            found = true;
          }
          counter++;
        }
        if (found === false) {
          itemList.push({
            type: item.type,
            dateDebut: item.date,
            quantity: parseInt(item.quantity),
          });
        }
      }
    });

    console.log(itemList);
    return itemList;
  };

  const handlerDataLoading = () => {
    if (userParc.length !== 0 && !onLoad) {
      setOnLoad(true);
      console.log(`ResultDisplay =>`, userParc);
      console.log(`/setInventory ${baseUrl} ${user} =>`);

      let data = { user: `${user}`, inventory: userParc, type: 0 };
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
              console.log(annualCost);
            
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
  };

  const filterGlobalType = (data) => {
    // Filtrer les éléments qui ne commencent pas par "/"
    const filteredData = data.filter((item) => item.startsWith("/"));

    // Enlever le "/" des éléments restants
    const result = filteredData.map((item) => item.slice(1));

    return result;
  };

  // requete serveur pour récupérer list des types pris en charge
  const handlerGetRefList = () => {
    console.log(`handlerGetRefList ${baseUrl} => ${token} `);

    axios
      .get(`${baseUrl}/getRefList/${user}/${token}`, { withCredentials: true })
      .then((res) => {
        // Vérification si la requête a réussi (statut 200-299)
        if (!res.ok) {
          throw new Error(`Erreur HTTP! Statut: ${res.status}`);
        }
        // Manipulation des données
        setTypeEquipement(filterGlobalType(res.data));
        console.log(typeEquipement);
      })
      .catch((error) => {
        // Gestion des erreurs
        console.error("Erreur de redaxios:", error.message);
      });
  };

  useEffect(() => {
    if (boxes.length === 0) {
      setBoxesEmpty(true);
    } else if (boxesChange) {

      console.log("try change", boxesChange);
      let allUpdated = true;
      console.log("boxes", boxes);

      boxes.forEach((box) => {
        if (box.date === "" || box.quantity === "" || box.type === "") {
          allUpdated = false;
        }
      });

      if (allUpdated) {
        console.log("=> request maj userParc");
        setBoxesEmpty(false);
        setUserParc(formatageUpData(boxes));
      }
    }
  }, [boxesChange, boxes]);

  useEffect(() => {
    if (boxesChange&&!boxesEmpty) {
      console.log("=> request compute impact");
      setBoxesChange(false);
      handlerDataLoading();
    }
  }, [userParc,boxesEmpty, baseUrl, user]);

  useEffect(() => {
    if (annee !== -1) {
      formatageCout(annualCost[annee]);
    }
  }, [annee]);

  useEffect(() => {
    if (typeEquipement === -1) {
      handlerGetRefList();
    }
  }, [typeEquipement]);

  return (
    <Box margin=" 0 20px 20px 20px">
      <Box
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 4"
          gridRow="span 7"
          backgroundColor={colors.primary[400]}
          borderRadius="20px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header
              title="Sélection des Items"
              subtitle="Choisissez chaque item à la main"
            />
          </Box>
          <Box ml="20px" mr="20px">
            <Divider sx={{ marginY: 2 }} /> {/* Add a line of separation */}
            <Liste
              typeEquipement={typeEquipement}
              boxes={boxes}
              setBoxes={setBoxes}
              setBoxesChange={setBoxesChange}
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          borderRadius="20px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                EtapeACV
              </Typography>
            </Box>
            {/*<Box>
                  <IconButton>
                    <DownloadOutlinedIcon sx={{fontSize:"26px", color:colors.greenAccent[500]}}/>
                  </IconButton>
                </Box>*/}
          </Box>
          {boxesEmpty === true ? (
            <>
              <Box height="70%" justifyContent="center" display="flex">
                <Skeleton variant="rounded" width="95%" height="100%" />
              </Box>
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                ml={8}
                mr={18}
                mt={2}
              >
                <Skeleton variant="circular" width={90} height={90} />
                <Skeleton variant="circular" width={90} height={90} />
                <Skeleton variant="circular" width={90} height={90} />
                <Skeleton variant="circular" width={90} height={90} />
                <Skeleton variant="circular" width={90} height={90} />
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
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          borderRadius="20px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Répartition
              </Typography>
            </Box>
          </Box>
          {boxesEmpty === true ? (
            <Box
              display="flex"
              justifyContent="center"
              height="89%"
              width="100%"
            >
              <Skeleton variant="circular" width={400} height={400} />
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
            <Box height="85%">
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
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          borderRadius="20px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Descriptif
              </Typography>
            </Box>
            {/*<Box>
                  <IconButton>
                    <DownloadOutlinedIcon sx={{fontSize:"26px", color:colors.greenAccent[500]}}/>
                  </IconButton>
                </Box>*/}
          </Box>
          {boxesEmpty === true ? (
            <>
              <Box display="flex" flexDirection="column" m={4} height="80%">
                <Stack spacing={1}>
                  <Box>
                    <Stack spacing={1}>
                      <Skeleton variant="rounded">
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Critère
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Critere"
                            defaultValue={0}
                          >
                            <MenuItem
                              value={0}
                              onClick={() => {
                                setCritere(0);
                              }}
                            >
                              <AirIcon /> Changement climatique{" "}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Skeleton>
                      <Skeleton variant="rounded">
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Critère
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Critere"
                            defaultValue={0}
                          >
                            <MenuItem
                              value={0}
                              onClick={() => {
                                setCritere(0);
                              }}
                            >
                              <AirIcon /> Changement climatique{" "}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Skeleton>
                    </Stack>
                  </Box>
                  <Box>
                    <Stack spacing={1} width="100%">
                      <Skeleton variant="rounded" width="100%">
                        <Typography>.</Typography>
                      </Skeleton>
                      <Skeleton variant="rounded" width="100%">
                        <Typography>.</Typography>
                      </Skeleton>
                      <Skeleton variant="rounded" width="100%">
                        <Typography>.</Typography>
                      </Skeleton>
                      <Skeleton variant="rounded" width="100%">
                        <Typography>.</Typography>
                      </Skeleton>
                    </Stack>
                  </Box>
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
            <Box height="80%" mt="25px" p="0 30px">
              <Stack spacing={1}>
                <Box width="50%">
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
                <Box width="50%">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Année</InputLabel>
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
                    Nombre de matériel IT :{" "}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="400"
                    color={colors.grey[100]}
                  >
                    {nbItem}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Nombre de matériel IT En Service :{" "}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="400"
                    color={colors.grey[100]}
                  >
                    {nbItemEnService}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Item;