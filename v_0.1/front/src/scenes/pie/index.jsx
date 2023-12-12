import { Box } from "@mui/material";
import Piechart from "../../components/Piechart";
import Header from "../../components/Header";


function Pie() {
    return (
      <Box m="20px">
        <Header title="Piechart" subtitle="simple Piechart"/>
        <Box height = "75vh">
            <Piechart />
        </Box>
      </Box>
    );
  }
  
  export default Pie;