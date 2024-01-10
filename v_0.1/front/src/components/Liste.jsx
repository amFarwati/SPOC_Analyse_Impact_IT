import * as React from 'react';
import { Box, Button, IconButton, useTheme, MenuItem, TextField } from "@mui/material";
import {  useEffect } from "react";
import {  tokens } from "../theme";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function MaListe() {
  const [boxes, setBoxes] = React.useState(() => {
    // Load saved data from local storage or use a default value
    const savedData = JSON.parse(localStorage.getItem('boxes')) || [];
    return savedData;
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const items = ["Écran",
  "Auto-Enregistrement",
  "Périphérique de Mobilité",
  "Traceur",
  "Terminal de Facturation",
  "Traceur",
  "Imprimante",
  "Équipement Réseau",
  "Ordinateur Personnel",
  "Système d'Encaissement",
  "Dispositif d'Enregistrement des Espèces",
  "Smartphone",
  "Serveur",
  "Dispositif de Communication",
  "Routeur IP",
  "Commutateur IP",
  "Répartiteur de Charge Réseau",
  "Consommable"
  
  ];

  useEffect(() => {
    // Save data to local storage whenever boxes change
    localStorage.setItem('boxes', JSON.stringify(boxes));
  }, [boxes]);

  const ajouterBox = () => {
    const nouvelElement = { id: Date.now(), date: '',quantity: '' };
    setBoxes([...boxes, nouvelElement]);
  };

  const supprimerBox = (id) => {
    const nouvellesBoxes = boxes.filter((box) => box.id !== id);
    setBoxes(nouvellesBoxes);
  };

  const handleDateChange = (id, enteredDate) => {
    const isValidInput = /^[0-9\/]*$/.test(enteredDate);
  
    if (isValidInput) {
      const updatedBoxes = boxes.map((box) => {
        if (box.id === id) {
          return { ...box, date: enteredDate };
        }
        return box;
      });
      setBoxes(updatedBoxes);
    }
  };

  const handleQuantityChange = (id, enteredQuantity) => {
    if (!isNaN(enteredQuantity)) {
      const updatedBoxes = boxes.map((box) => {
        if (box.id === id) {
          return { ...box, quantity: enteredQuantity };
        }
        return box;
      });
      setBoxes(updatedBoxes);
    }
  };
  
  

  return (
    <Box>
      <Box textAlign="center" marginBottom="16px">
        <Button onClick={ajouterBox} variant="contained" color="primary" size="large" sx={{backgroundColor:colors.blueAccent[700]}}>
        <AddIcon sx={{mr:"10px"}}/>
          Ajout Item
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
            <TextField
          id="filled-select-currency"
          select
          label="Item"
          helperText="Sélectionnez votre item"
          variant="filled"
        >
          {items.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
            <TextField
              label="Quantité"
              variant="filled"
              value={box.quantity}
              helperText="Seulement des chiffres"
              onChange={(e) => handleQuantityChange(box.id, e.target.value)}
            />
            <TextField
              label="Date (JJ/MM/AAAA)"
              variant="filled"
              value={box.date}
              helperText="Seulement des chiffres ou des '/'"
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
