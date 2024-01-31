import { Box } from "@mui/material";
import Barchart from "../../components/Barchart";
import Header from "../../components/Header";


function Bar() {
    return (
      <Box m="20px">
        <Header title="Barchart" subtitle="simple Barchart"/>
        <Box height = "75vh">
            <Barchart />
        </Box>
      </Box>
    );
  }
  
  export default Bar;