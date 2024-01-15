import {ColorModeContext,useMode} from "./theme";
import {CssBaseline,ThemeProvider,Box} from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import SideBar from "./scenes/global/Sidebar";
import {Routes,Route} from "react-router-dom";
import Dashboard from "./scenes/Dashboard";
import Selection from "./scenes/Item";



function App() {
  const[theme,colorMode]=useMode();
  return (<ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <div className="app">
      <main className="content">
        <Box display="flex" height="100%">
          <SideBar/>
          <Box display="flex" flexDirection="column" width="100%">
            <Topbar/>
            <Routes>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/home" element={<Dashboard/>}/>
              <Route path="/selection" element={<Selection/>}/>
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
