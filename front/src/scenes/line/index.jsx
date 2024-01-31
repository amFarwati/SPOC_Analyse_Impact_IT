import { Box } from "@mui/material";
import Linechart from "../../components/Linechart";
import Header from "../../components/Header";


function Line() {
    return (
      <Box m="20px">
        <Header title="Linechart" subtitle="simple Linechart"/>
        <Box height = "75vh">
            <Linechart />
        </Box>
      </Box>
    );
  }
  
  export default Line;