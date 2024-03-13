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
import BarchartACV from "../../components/BarchartACV";
import Piechart from "../../components/Piechart";
import CircularProgress from "@mui/material/CircularProgress";
import AirIcon from "@mui/icons-material/Air";
import MasksIcon from "@mui/icons-material/Masks";
import WifiIcon from "@mui/icons-material/Wifi";
import WaterIcon from "@mui/icons-material/Water";
import FactoryIcon from "@mui/icons-material/Factory";
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

  token = encodeURIComponent(token);

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
    if (boxesChange && !boxesEmpty) {
      console.log("=> request compute impact");
      setBoxesChange(false);
      handlerDataLoading();
    }
  }, [userParc, boxesEmpty, baseUrl, user]);

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
    <Box
      display="grid"
      gridTemplateColumns="repeat(12,1fr)"
      gridTemplateRows="repeat(12,1fr)"
      gap="15px"
      margin="20px 20px 0 20px"
      height="83vh"
    >
      <Box
        gridColumn="span 4"
        gridRow="span 12"
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
        <Box ml="20px" mr="20px" height="85%">
          <Divider sx={{ marginY: 2 }} /> {/* Add a line of separation */}
          <Liste
            typeEquipement={typeEquipement}
            boxes={boxes}
            setBoxes={setBoxes}
            setBoxesChange={setBoxesChange}
          />
        </Box>
      </Box>
      {boxesEmpty ? (
        <>
          <Box gridColumn="span 8" gridRow="span 12">
            <ul>
              <Typography variant="h3">
                Bienvenue dans l'outil de calcul à la carte.
              </Typography>
            </ul>
            <Typography variant="h5">
              Grâce à cet outil, vous allez pouvoir constituer un parc
              informatique au fur et à mesure tout en voyant l'évolution de
              l'impact de celui-ci. Afin de simplifier la constitution du parc,
              nous vous mettons à disposition une liste d'équipements standards
              dont le coup approximer par une moyenne sur des équipements réels
              similaires.
            </Typography>
            <ul>
              <Typography variant="h4">Pour commencer</Typography>
            </ul>
            <Typography variant="h5">
              Pour commencer, Veuillez ajouter un premier item à votre parc.
              Pour cela il faut appuyer sur le bouton "Ajout Item" sur le
              panneau de gauche.
            </Typography>
            <ul>
              <Typography variant="h4">Configuration de l'item</Typography>
            </ul>
            <Typography variant="h5">
              Maintenant que votre item est créé, il faut le configurer. Il
              faudra ainsi remplir 3 champs:
            </Typography>
            <ul>
              <li>
                Item : en cliquant sur ce champ, vous pourrez choisir
                l'équipement que vous voulez ajouter dans une liste déroulante.
              </li>
              <li>
                Quantité : ce champ vous permet de renseigner le nombre
                d'équipement du même type que vous souhaitez rajouter.
              </li>
              <li>
                Date d'achat : ce champ permet de renseigner la date d'achat du
                lot d'équipement. Il permet de gérer automatiquement le
                déclassement des équipements en fonction de leur durée de vie
                moyenne.
              </li>
            </ul>
            <ul>
              <Typography variant="h5">
                Remarque : Vous pouvez tout à fait ajouter plusieurs fois un
                même type d'équipement avec des dates d'achat différentes.
              </Typography>
            </ul>
          </Box>
        </>
      ) : (
        <>
          <Box
            gridColumn="span 8"
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
                EtapeACV
              </Typography>
            </Box>
            {onLoad ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <CircularProgress fontSize="large" color="success" />
              </Box>
            ) : (
              <Box height="85%">
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
            gridColumn="span 5"
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
            {onLoad ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="89%"
              >
                <CircularProgress fontSize="large" color="success" />
              </Box>
            ) : (
              <Box height="80%">
                {
                  <BarchartACV
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
                }
                {/*
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
                  */}
              </Box>
            )}
          </Box>
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
                Paramètrage
              </Typography>
            </Box>
            {onLoad ? (
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
                height="80%"
                mt="25px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  height="80%"
                  width="95%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-around"
                  alignItems="center"
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
                              {an}
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
        </>
      )}
    </Box>
  );
}

export default Item;
