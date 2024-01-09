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
import AirIcon from '@mui/icons-material/Air';
import MasksIcon from '@mui/icons-material/Masks';
import WifiIcon from '@mui/icons-material/Wifi';
import WaterIcon from '@mui/icons-material/Water';
import FactoryIcon from '@mui/icons-material/Factory';
import InputFileUpload from "../../components/InputFileUpload"
import Skeleton from '@mui/material/Skeleton';


import axios from 'redaxios';
import * as React from 'react';


export const User_Context = createContext();

function Dashboard() {
    const theme = useTheme();
    const [userParc,setUserParc] = useState([]);
    const [onLoad,setOnLoad] = useState(null);
    const [use,setUse] = useState([0,0,0,0,0]);
    const [fab,setFab] = useState([0,0,0,0,0]);
    const [distrib,setDistrib] = useState([0,0,0,0,0]);
    const [fin,setFin] = useState([0,0,0,0,0]);
    const [annualCost,setAnnualCost] = useState([]);
    const [unite,setUnite] = useState([]);
    const [nbItem,setNbItem]= useState(0);
    const [nbItemEnService,setNbItemEnService]= useState(0);
    const [annee,setAnnee] = useState(-1);

    const [critere,setCritere] = useState(0);
    const [etape,setEtape] = useState(0);

    const colors = tokens(theme.palette.mode);

    const chartColor = 'set2';
    
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
                        setAnnee(annees[annees.length-1]);
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

    useEffect(()=>{
      if(annee !== -1){formatageCout(annualCost[annee]);}
    },[annee])

    return (
      <User_Context.Provider value={ [userParc,setUserParc,login] }>
        <Box m="20px">
            <Box  display="flex" justifyContent="center" alignItems="center" mb="50px">
              {onLoad?<></>:<InputFileUpload/>}
            </Box>
            <Box  display="flex" justifyContent="center" alignItems="center" mb="50px">
              {onLoad?
              <></>:        
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
              
              <Box gridColumn="span 4" gridRow="span 4" backgroundColor={colors.primary[400]} borderRadius = "20px"> 
                <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
                 
                  <Box>
                    <IconButton>
                      <DownloadOutlinedIcon sx={{fontSize:"26px", color:colors.greenAccent[500]}}/>
                    </IconButton>
                  </Box>
                </Box>
                {onLoad===null?
                  <Box display="flex" justifyContent="center" height='100%' width='100%'>
                    <Skeleton variant="circular" width={400} height={400} />
                  </Box>
                  :
                  onLoad?
                  <Box display="flex" justifyContent="center" alignItems="center" height='100%'>
                    <CircularProgress fontSize='large' color="success" />
                  </Box>
                  : 
                  <>
                    <Piechart unite={unite} finDeVie={fin} usage={use} fabrication={fab} distribution={distrib} critere={critere} color={chartColor}/>
                  </>
                }
              </Box>
              <Box gridColumn="span 8" gridRow="span 4" backgroundColor={colors.primary[400]} borderRadius = "20px"> 
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
                {onLoad===null?
                    <>
                    <Box height = "70%" justifyContent="center" display='flex' >
                      <Skeleton variant="rounded" width='95%' height='100%' />
                    </Box>
                    <Box display="flex" justifyContent="space-around" alignItems="center" ml={8} mr={18} mt={2}>
                      <Skeleton variant="circular" width={90} height={90} />
                      <Skeleton variant="circular" width={90} height={90} />
                      <Skeleton variant="circular" width={90} height={90} />
                      <Skeleton variant="circular" width={90} height={90} />
                      <Skeleton variant="circular" width={90} height={90} />
                    </Box>
                  </>
                  :
                  onLoad?
                  <Box display="flex" justifyContent="center" alignItems="center" height='100%'>
                    <CircularProgress fontSize='large' color="success" />
                  </Box>
                  : 
                  <>
                    <Barchart isDashboard={true} unite={unite} finDeVie={fin} usage={use} fabrication={fab} distribution={distrib} color={chartColor}/>
                  </>
                }
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
                        label="Critere"
                        defaultValue="Changement climatique"
                      >
                        <MenuItem value={0} onClick={()=>{setCritere(0)}}><AirIcon/> Changement climatique </MenuItem>
                        <MenuItem value={1} onClick={()=>{setCritere(1)}}><MasksIcon/> Particules fines</MenuItem>
                        <MenuItem value={2} onClick={()=>{setCritere(2)}}><WifiIcon/> Radiation ionisante</MenuItem>
                        <MenuItem value={3} onClick={()=>{setCritere(3)}}><WaterIcon/> Acidification</MenuItem>
                        <MenuItem value={4} onClick={()=>{setCritere(4)}}><FactoryIcon/> Usage des ressources (mineraux et metaux)</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box width="50%">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Etape ACV</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Etape_ACV"
                        defaultValue="Fabrication"
                      >
                        <MenuItem value={0} onClick={()=>{setEtape(0)}}> Fabrication </MenuItem>
                        <MenuItem value={1} onClick={()=>{setEtape(1)}}> Distribution</MenuItem>
                        <MenuItem value={2} onClick={()=>{setEtape(2)}}> Usage</MenuItem>
                        <MenuItem value={3} onClick={()=>{setEtape(3)}}> Fin de vie</MenuItem>
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
                        defaultValue="Annee"
                      >
                        {Object.keys(annualCost).map((an)=>{
                          return <MenuItem value={an} onClick={()=>{setAnnee(an)}}> {an} </MenuItem>;
                        })
                        }
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
                {onLoad===null?
                  <>
                    <Box justifyContent="center" display='flex' m={4}>
                      <Skeleton variant="rounded" width='100%' height={330}/>
                    </Box>
                  </>
                  :
                  onLoad?
                  <Box display="flex" justifyContent="center" alignItems="center" height='100%'>
                    <CircularProgress fontSize='large' color="success" />
                  </Box>
                  : 
                  <>
                    <Linechart isDashboard={true} annualCost={annualCost} critere={critere} etapeACV={etape} color={chartColor}/>
                  </>
                }
              </Box>
            </Box>
            
            
        </Box>
      </User_Context.Provider>
    );
  }
  
  export default Dashboard;