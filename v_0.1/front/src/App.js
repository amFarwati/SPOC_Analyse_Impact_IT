import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import SideBar from "./scenes/global/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/Dashboard";
import Selection from "./scenes/Item";
import { useState } from "react";

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
  const [typeEquipement, setTypeEquipement] = useState(-1);

  const login = "user_1";
  const baseUrl = `http://insa-numimpact-01.insa-lyon.fr/:4000`;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Box display="flex" height="100%">
              <SideBar user={login} serveur={baseUrl} />
              <Box display="flex" flexDirection="column" width="100%" height='100%'>
                <Topbar />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Dashboard
                        login={login}
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
                    path="/home"
                    element={
                      <Dashboard
                        login={login}
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
                    path="/selection"
                    element={
                      <Selection
                        user={login}
                        baseUrl={baseUrl}
                        typeEquipement={typeEquipement}
                        setTypeEquipement={setTypeEquipement}
                      />
                    }
                  />
                </Routes>
              </Box>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
