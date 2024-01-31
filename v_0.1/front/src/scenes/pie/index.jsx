import { Box,FormControl, InputLabel, Select,MenuItem } from "@mui/material";
import Piechart from "../../components/Piechart";
import Header from "../../components/Header";


function Pie() {
    return (
      <Box m="20px">
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    // value={age}
    label="Critere"
    // onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>
        <Box height = "75vh">
            <Piechart />
        </Box>
      </Box>
    );
  }
  
  export default Pie;