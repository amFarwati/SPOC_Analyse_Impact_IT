import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import SideBar from "./scenes/global/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./scenes/Dashboard";
import Selection from "./scenes/Item";
import Login from "./scenes/Login/Login";
import Accueil from "./scenes/Accueil/Acceuil";
import Profile from "./scenes/Profile/Profile";
import Inscription from "./scenes/Inscription/Inscription";
import { useEffect, useState } from "react";

function App() {
  const [theme, colorMode] = useMode();

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

  const [userParc_selec, setUserParc_selec] = useState([]);
  const [onLoad_selec, setOnLoad_selec] = useState(null);
  const [use_selec, setUse_selec] = useState([0, 0, 0, 0, 0]);
  const [fab_selec, setFab_selec] = useState([0, 0, 0, 0, 0]);
  const [distrib_selec, setDistrib_selec] = useState([0, 0, 0, 0, 0]);
  const [fin_selec, setFin_selec] = useState([0, 0, 0, 0, 0]);
  const [annualCost_selec, setAnnualCost_selec] = useState([]);
  const [unite_selec, setUnite_selec] = useState([]);
  const [nbItem_selec, setNbItem_selec] = useState(0);
  const [nbItemEnService_selec, setNbItemEnService_selec] = useState(0);
  const [annee_selec, setAnnee_selec] = useState(-1);
  const [critere_selec, setCritere_selec] = useState(0);
  const [typeEquipement, setTypeEquipement] = useState(-1);
  const [boxes, setBoxes] = useState(() => {
    const savedData = [];
    return savedData;
  });

  const [login, setLogin] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [token, setToken] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [isDeconnected, setIsDeconnected] = useState(false);
  const baseUrl = `http://insa-numimpact-01.insa-lyon.fr/server`;
  //const baseUrl = `http://localhost:4000`;

  useEffect(() => {
    console.log(
      `login: ${login}, isLogged: ${isLogged}, isDeconnected: ${isDeconnected}`
    );
  }, [login, isLogged, isDeconnected]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Box display="flex" height="100%">
              {isLogged && !isDeconnected ? (
                <SideBar
                  user={login}
                  serveur={baseUrl}
                  picture={profilePic}
                  setIsDeconnected={setIsDeconnected}
                />
              ) : (
                <></>
              )}
              <Box
                display="flex"
                flexDirection="column"
                width="100%"
                height="100%"
              >
                <Topbar sx={{ flex: 1 }} />
                <Box sx={{ flex: 2 }}>
                  {isLogged && !isDeconnected ? (
                    <Routes>
                      <Route
                        path="/selection"
                        element={
                          <Selection
                            token={token}
                            user={login}
                            baseUrl={baseUrl}
                            typeEquipement={typeEquipement}
                            setTypeEquipement={setTypeEquipement}
                            userParc={userParc_selec}
                            setUserParc={setUserParc_selec}
                            onLoad={onLoad_selec}
                            setOnLoad={setOnLoad_selec}
                            use={use_selec}
                            setUse={setUse_selec}
                            fab={fab_selec}
                            setFab={setFab_selec}
                            distrib={distrib_selec}
                            setDistrib={setDistrib_selec}
                            fin={fin_selec}
                            setFin={setFin_selec}
                            annualCost={annualCost_selec}
                            setAnnualCost={setAnnualCost_selec}
                            unite={unite_selec}
                            setUnite={setUnite_selec}
                            nbItem={nbItem_selec}
                            setNbItem={setNbItem_selec}
                            nbItemEnService={nbItemEnService_selec}
                            setNbItemEnService={setNbItemEnService_selec}
                            annee={annee_selec}
                            setAnnee={setAnnee_selec}
                            critere={critere_selec}
                            setCritere={setCritere_selec}
                            boxes={boxes}
                            setBoxes={setBoxes}
                          />
                        }
                      />
                      <Route path="/accueil" element={<Accueil />} />
                      <Route
                        path="/dashboard"
                        element={
                          <Dashboard
                            token={token}
                            user={login}
                            baseUrl={baseUrl}
                            userParc={userParc}
                            setUserParc={setUserParc}
                            onLoad={onLoad}
                            setOnLoad={setOnLoad}
                            use={use}
                            setUse={setUse}
                            fab={fab}
                            setFab={setFab}
                            distrib={distrib}
                            setDistrib={setDistrib}
                            fin={fin}
                            setFin={setFin}
                            annualCost={annualCost}
                            setAnnualCost={setAnnualCost}
                            unite={unite}
                            setUnite={setUnite}
                            nbItem={nbItem}
                            setNbItem={setNbItem}
                            nbItemEnService={nbItemEnService}
                            setNbItemEnService={setNbItemEnService}
                            annee={annee}
                            setAnnee={setAnnee}
                            critere={critere}
                            setCritere={setCritere}
                            etape={etape}
                            setEtape={setEtape}
                          />
                        }
                      />
                      <Route
                        path="/profile"
                        element={<Profile setProfilePic={setProfilePic} />}
                      />
                      <Route
                        path="*"
                        element={<Navigate to="/selection" replace />}
                      />
                    </Routes>
                  ) : (
                    <Routes>
                      <Route
                        path="/connexion"
                        element={
                          <Login
                            setLogin={setLogin}
                            setToken={setToken}
                            server_URL={baseUrl}
                            setIsLogged={setIsLogged}
                            setIsDeconnected={setIsDeconnected}
                          />
                        }
                      />
                      <Route
                        path="/inscription"
                        element={
                          <Inscription
                            setLogin={setLogin}
                            setToken={setToken}
                            server_URL={baseUrl}
                            setIsLogged={setIsLogged}
                            setIsDeconnected={setIsDeconnected}
                          />
                        }
                      />
                      <Route
                        path="*"
                        element={<Navigate to="/connexion" replace />}
                      />
                    </Routes>
                  )}
                </Box>
              </Box>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
