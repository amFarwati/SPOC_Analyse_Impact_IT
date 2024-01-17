import { Box, Divider, Button, IconButton, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Liste from "../../components/Liste";
import { tokens } from "../../theme";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import { useEffect, useState } from "react";
import axios from "redaxios";
import dayjs from "dayjs";
import "dayjs/locale/fr";

import * as React from "react";

function Item({ user, baseUrl, typeEquipement, setTypeEquipement }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(false);
  const [pipe, setPipe] = useState(-1);

  const [userParc, setUserParc] = useState([]);
  const [onLoad, setOnLoad] = useState(null);
  const [use, setUse] = useState([0, 0, 0, 0, 0]);
  const [fab, setFab] = useState([0, 0, 0, 0, 0]);
  const [distrib, setDistrib] = useState([0, 0, 0, 0, 0]);
  const [fin, setFin] = useState([0, 0, 0, 0, 0]);
  const [annualCost, setAnnualCost] = useState([]);
  const [unite, setUnite] = useState([]);
  const [nbItem, setNbItem] = useState(0);
  const [nbItemEnService, setNbItemEnService] = useState(0);
  const [annee, setAnnee] = useState(-1);
  const [critere, setCritere] = useState(0);
  const [etape, setEtape] = useState(0);

  const login = `${user}_iteratif`;

  const [boxes, setBoxes] = React.useState(() => {
    // Load saved data from local storage or use a default value
    const savedData = JSON.parse(localStorage.getItem("boxes")) || [];
    return savedData;
  });

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
    setUserParc(formatageUpData(boxes));
    if (userParc.length !== 0) {
      setOnLoad(true);
      console.log(`ResultDisplay =>`, userParc);
      console.log(`/setInventory ${baseUrl} ${login}_test =>`);

      let data = { user: `${login}_test`, inventory: userParc };
      console.log(data);

      axios
        .put(`${baseUrl}/setInventory`, data, {
          withCredentials: true,
          "Content-Type": "application/json",
        })
        .then((res) => {
          // Vérification si la requête a réussi (statut 200-299)
          if (!res.ok) {
            throw new Error(`Erreur HTTP! Statut: ${res.status}`);
          }
          // Manipulation des données

          console.log(`/getImpact ${baseUrl} ${login}_test =>`);
          axios
            .get(`${baseUrl}/getImpact/${login}_test`, {
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
  };

  const filterGlobalType = (data) => {
    // Filtrer les éléments qui ne commencent pas par "/"
    const filteredData = data.filter((item) => item.startsWith("/"));

    // Enlever le "/" des éléments restants
    const result = filteredData.map((item) => item.slice(1));

    return result;
  };

  // requete serveur pour récupérer list des types pris en charge
  const handlerGetTypeList = () => {
    console.log(`handlerGetTypeList ${baseUrl} =>`);
    setIsLoading(true);

    axios
      .get(`${baseUrl}/getTypeList`, { withCredentials: true })
      .then((res) => {
        // Vérification si la requête a réussi (statut 200-299)
        if (!res.ok) {
          throw new Error(`Erreur HTTP! Statut: ${res.status}`);
        }
        // Manipulation des données
        setTypeEquipement(filterGlobalType(res.data));
        console.log(typeEquipement);
        setIsLoading(false);
      })
      .catch((error) => {
        // Gestion des erreurs
        console.error("Erreur de redaxios:", error.message);
      });
  };

  useEffect(() => {
    if (typeEquipement === -1) {
      handlerGetTypeList();
    }
  }, []);

  return (
    <Box m='20px'>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="140px"
        gap="20px"
        mt="20px"
      >
        <Box
          gridColumn="span 4"
          gridRow="span 6"
          backgroundColor={colors.primary[400]}
          borderRadius="20px"
        >
          <Box mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center">
            <Header
              title="Sélection des Items"
              subtitle="Choisissez chaque item à la main"
            />
          </Box>
          {onLoad ? (
            <></>
          ) : (
            <Box textAlign="center" marginBottom="16px">
              <Button
                onClick={handlerDataLoading}
                variant="contained"
                color="primary"
                size="large"
                sx={{ backgroundColor: colors.blueAccent[700] }}
              >
                <UploadOutlinedIcon sx={{ mr: "10px" }} />
                Analyser
              </Button>
            </Box>
          )}
          <Box ml='20px' mr='20px'>
            <Divider sx={{ marginY: 2 }} /> {/* Add a line of separation */}
            <Liste
              typeEquipement={typeEquipement}
              setPipe={setPipe}
              boxes={boxes}
              setBoxes={setBoxes}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 6"
          backgroundColor={colors.primary[400]}
          borderRadius="20px"
        ></Box>
      </Box>
    </Box>
  );
}
export default Item;
