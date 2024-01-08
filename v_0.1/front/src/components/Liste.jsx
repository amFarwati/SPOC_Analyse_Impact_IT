import * as React from 'react';
import { Box, Button, IconButton, Typography, useTheme, Select, MenuItem, TextField } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


function MaListe() {
  const [boxes, setBoxes] = React.useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const ajouterBox = () => {
    const nouvelElement = { id: Date.now(), contenu: 'New Item', dropdown1: 'Option 1', dropdown2: 'Option A', date: '' };
    setBoxes([...boxes, nouvelElement]);
  };

  const supprimerBox = (id) => {
    const nouvellesBoxes = boxes.filter((box) => box.id !== id);
    setBoxes(nouvellesBoxes);
  };

  const handleDropdown1Change = (id, selectedOption) => {
    const updatedBoxes = boxes.map((box) => {
      if (box.id === id) {
        return { ...box, dropdown1: selectedOption };
      }
      return box;
    });
    setBoxes(updatedBoxes);
  };

  const handleDropdown2Change = (id, selectedOption) => {
    const updatedBoxes = boxes.map((box) => {
      if (box.id === id) {
        return { ...box, dropdown2: selectedOption };
      }
      return box;
    });
    setBoxes(updatedBoxes);
  };

  const handleDateChange = (id, enteredDate) => {
    const updatedBoxes = boxes.map((box) => {
      if (box.id === id) {
        return { ...box, date: enteredDate };
      }
      return box;
    });
    setBoxes(updatedBoxes);
  };

  return (
    <Box>
      <Box textAlign="center" marginBottom="16px">
        <Button onClick={ajouterBox} variant="contained" color="primary" size="large" sx={{backgroundColor:colors.blueAccent[700]}}>
        <AddIcon sx={{mr:"10px"}}/>
          Add Item
        </Button>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        {boxes.map((box) => (
          <Box
            key={box.id}
            width="100%"
            margin="8px"
            padding="16px"
            border="1px solid #ddd"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>{box.contenu}</Typography>
            <Select
              value={box.dropdown1}
              onChange={(e) => handleDropdown1Change(box.id, e.target.value)}
            >
              <MenuItem value="Option 1">Option 1</MenuItem>
              <MenuItem value="Option 2">Option 2</MenuItem>
              {/* Add more options as needed */}
            </Select>
            <Select
              value={box.dropdown2}
              onChange={(e) => handleDropdown2Change(box.id, e.target.value)}
            >
              <MenuItem value="Option A">Option A</MenuItem>
              <MenuItem value="Option B">Option B</MenuItem>
              {/* Add more options as needed */}
            </Select>
            <TextField
              label="Date (JJ/DD/AAAA)"
              variant="outlined"
              value={box.date}
              onChange={(e) => handleDateChange(box.id, e.target.value)}
            />
            <IconButton onClick={() => supprimerBox(box.id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default MaListe;