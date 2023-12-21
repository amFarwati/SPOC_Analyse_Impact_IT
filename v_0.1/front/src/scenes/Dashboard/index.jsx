import { useState, createContext, useEffect } from 'react';
import { Box,IconButton,Button,Typography,useTheme,FormControl, InputLabel, Select,MenuItem } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import Linechart from "../../components/Linechart";
import Barchart from "../../components/Barchart";
import Piechart from "../../components/Piechart";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import DownloadingRoundedIcon from '@mui/icons-material/DownloadingRounded';
import CircularProgress from '@mui/material/CircularProgress';
import InputFileUpload from "../../components/InputFileUpload"
import axios from 'redaxios';
import * as React from 'react';


export const User_Context = createContext();

function Dashboard() {
    const theme = useTheme();
    const [userParc,setUserParc] = useState([]);
    const [onLoad,setOnLoad] = useState(false);
    const [use,setUse] = useState([0,0,0,0,0]);
    const [fab,setFab] = useState([0,0,0,0,0]);
    const [distrib,setDistrib] = useState([0,0,0,0,0]);
    const [fin,setFin] = useState([0,0,0,0,0]);
    const [annualCost,setAnnualCost] = useState(null);
    const [unite,setUnite] = useState([]);
    const [nbItem,setNbItem]= useState(0);
    const [nbItemEnService,setNbItemEnService]= useState(0);

    const [critere,setCritere] = useState(0);

    const colors = tokens(theme.palette.mode);
    
    const login = 'user_1';
    const baseUrl = `http://localhost:4000`;

    const formatageCout = (coutJSON)=>{ 
      /*coutJSON tel que 
            FABRICATION : [0,0,0,0,0],
            DISTRIBUTION : [0,0,0,0,0],
            UTILISATION : [0,0,0,0,0],
            FIN_DE_VIE : [0,0,0,0,0]
        */
          setUse(coutJSON.UTILISATION)
          setFab(coutJSON.FABRICATION)
          setDistrib(coutJSON.DISTRIBUTION)
          setFin(coutJSON.FIN_DE_VIE)
    };

    const handleImpactRequest = () => {
      setOnLoad(true);
      console.log(`/getImpact ${baseUrl} ${login}_test =>`)
      axios.get(`${baseUrl}/getImpact/${login}_test`, { withCredentials: true })
          .then(res => {
              // Vérification si la requête a réussi (statut 200-299)
              if (!res.ok) {
                  throw new Error(`Erreur HTTP! Statut: ${res.status}`);
              }
              // Manipulation des données
              console.log(res.data)

              let annees = Object.keys(res.data.cost);

              formatageCout(res.data.cost[annees[annees.length-1]]);
              setAnnualCost(res.data.cost);
              setUnite(res.data.unite);
              setNbItem(res.data.nbItem);
              setNbItemEnService(res.data.nbItemEnService);
              setOnLoad(false);
          })
          .catch(error => {
              // Gestion des erreurs
              console.error('Erreur de redaxios:', error.message);
              setOnLoad(false);
          });
    }
    
    useEffect(() => {
      if(userParc.length !== 0){
        setOnLoad(true);
        console.log(`ResultDisplay =>`,userParc)
        console.log(`/setInventory ${baseUrl} ${login}_test =>`)

        let data = {  user: `${login}_test`,
                      inventory: userParc,
                    }

        axios.put(`${baseUrl}/setInventory`, data, { withCredentials: true, 'Content-Type' : 'application/json' })
            .then(res => {
                // Vérification si la requête a réussi (statut 200-299)
                if (!res.ok) {
                    throw new Error(`Erreur HTTP! Statut: ${res.status}`);
                }
                // Manipulation des données
                
                console.log(`/getImpact ${baseUrl} ${login}_test =>`)
                axios.get(`${baseUrl}/getImpact/${login}_test`, { withCredentials: true })
                    .then(res => {
                        // Vérification si la requête a réussi (statut 200-299)
                        if (!res.ok) {
                            throw new Error(`Erreur HTTP! Statut: ${res.status}`);
                        }
                        // Manipulation des données
                        console.log(res.data)

                        let annees = Object.keys(res.data.cost);

                        formatageCout(res.data.cost[annees[annees.length-1]]);
                        setAnnualCost(res.data.cost);
                        setUnite(res.data.unite);
                        setNbItem(res.data.nbItem);
                        setNbItemEnService(res.data.nbItemEnService);
                        setOnLoad(false);
                    })
                    .catch(error => {
                        // Gestion des erreurs
                        console.error('Erreur de redaxios:', error.message);
                        setOnLoad(false);
                    });
                    
            })  
            .catch(error => {
                // Gestion des erreurs
                console.error('Erreur de redaxios:', error.message);
                setOnLoad(false);
            });
    
      }
    },[userParc,baseUrl,login]);

    return (
      <User_Context.Provider value={ [userParc,setUserParc,login] }>
        <Box m="20px">
            <Box  display="flex" justifyContent="center" alignItems="center" mb="50px">
              {onLoad?<CircularProgress color="success" />:<InputFileUpload/>}
            </Box>
            <Box  display="flex" justifyContent="center" alignItems="center" mb="50px">
              {onLoad?
              <CircularProgress color="success" />:        
              <Button component="label" variant="contained" onClick={handleImpactRequest} startIcon={<DownloadingRoundedIcon />}>
                 Last Push Impact
              </Button>}
            </Box>
            <Box  display="flex" justifyContent="space-between" alignItems="center">
              <Header title="DASHBOARD" subtitle="Welcome to your Dashboard" />
            </Box>

            {/*GRID and charts*/}
            <Box  display="grid" gridTemplateColumns="repeat(12,1fr)" gridAutoRows="140px" gap="20px" mt="20px">
              {/*ROW 1*/}
              
              <Box gridColumn="span 4" gridRow="span 3" backgroundColor={colors.primary[400]} borderRadius = "20px"> 
                <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
                 
                  <Box>
                    <IconButton>
                      <DownloadOutlinedIcon sx={{fontSize:"26px", color:colors.greenAccent[500]}}/>
                    </IconButton>
                  </Box>
                </Box>
                <Box height = "90%" >
                  <Piechart unite={unite} finDeVie={fin} usage={use} fabrication={fab} distribution={distrib} critere={critere}/>
                </Box>
              </Box>
              <Box gridColumn="span 8" gridRow="span 3" backgroundColor={colors.primary[400]} borderRadius = "20px"> 
                <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                  <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>EtapeACV</Typography>
                  </Box>
                  <Box>
                    <IconButton>
                      <DownloadOutlinedIcon sx={{fontSize:"26px", color:colors.greenAccent[500]}}/>
                    </IconButton>
                  </Box>
                </Box>
                <Box height = "90%" >
                  <Barchart isDashboard={true} unite={unite} finDeVie={fin} usage={use} fabrication={fab} distribution={distrib}/>
                </Box>
              </Box>
              <Box gridColumn="span 8" gridRow="span 3" backgroundColor={colors.primary[400]} borderRadius = "20px"> 
                <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                  <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>Suivi</Typography>
                  </Box>
                  <Box>
                    <IconButton>
                      <DownloadOutlinedIcon sx={{fontSize:"26px", color:colors.greenAccent[500]}}/>
                    </IconButton>
                  </Box>
                </Box>
                <Box height="90%" ml="-20px">
                  <Linechart isDashboard={true} annualCost={annualCost} critere={critere}/>
                </Box>
              </Box>
              <Box gridColumn="span 4" gridRow="span 3" backgroundColor={colors.primary[400]} borderRadius = "20px"> 
                <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>Descriptif</Typography>
                  </Box>
                  <Box>
                    <IconButton>
                      <DownloadOutlinedIcon sx={{fontSize:"26px", color:colors.greenAccent[500]}}/>
                    </IconButton>
                  </Box>
                </Box>
                <Box height = "90%" mt="25px" p="0 30px" >
                  <Box width="50%">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Critère</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={age}
                          label="Critere"
                          // onChange={handleChange}
                        >
                          <MenuItem value={0} onClick={()=>{setCritere(0)}}>Climate change</MenuItem>
                          <MenuItem value={1} onClick={()=>{setCritere(1)}}>Particulate matter and respiratory inorganics</MenuItem>
                          <MenuItem value={2} onClick={()=>{setCritere(2)}}>Ionising radiation</MenuItem>
                          <MenuItem value={3} onClick={()=>{setCritere(3)}}>Acidification</MenuItem>
                          <MenuItem value={4} onClick={()=>{setCritere(4)}}>Resource use (minerals and metals)</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  <Box>
                    <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>Nombre de matériel IT : </Typography>
                    <Typography variant="h5" fontWeight="400" color={colors.grey[100]}>{nbItem}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>Nombre de matériel IT En Service : </Typography>
                    <Typography variant="h5" fontWeight="400" color={colors.grey[100]}>{nbItemEnService}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            
            
        </Box>
      </User_Context.Provider>
    );
  }
  
  export default Dashboard;