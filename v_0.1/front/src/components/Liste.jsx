import * as React from "react";
import {
  Box,
  Button,
  IconButton,
  useTheme,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { tokens } from "../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function MaListe({ typeEquipement,boxes,setBoxes }) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  var items = typeEquipement === -1 ? [] : typeEquipement;

  const ajouterBox = () => {
    const nouvelElement = { id: Date.now(), date: "", quantity: "", type: "" };
    setBoxes([...boxes, nouvelElement]);
  };

  const supprimerBox = (id) => {
    const nouvellesBoxes = boxes.filter((box) => box.id !== id);
    setBoxes(nouvellesBoxes);
  };

  const handleDateChange = (id, enteredDate) => {
    const isValidInput = /^[0-9\-]*$/.test(enteredDate);
    console.log(isValidInput, enteredDate);

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

  const handleTypeChange = (id, enteredType) => {
    const updatedBoxes = boxes.map((box) => {
      if (box.id === id) {
        return { ...box, type: enteredType };
      }
      return box;
    });
    setBoxes(updatedBoxes);
  };

  useEffect(() => {
    // Save data to local storage whenever boxes change
    localStorage.setItem("boxes", JSON.stringify(boxes));
    console.log(boxes);
  }, [boxes]);

  return (
    <Box>
      <Box textAlign="center" marginBottom="16px">
        <Button
          onClick={ajouterBox}
          variant="contained"
          color="primary"
          size="large"
          sx={{ backgroundColor: colors.blueAccent[700] }}
        >
          <AddIcon sx={{ mr: "10px" }} />
          Ajout Item
        </Button>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        height={850}
        sx={{ overflowY: 'auto',
            }} 
      >
        {boxes.map((box) => (
          <Box
            key={box.id}
            width="95%"
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
              value={box.type.slice(1)}
              onChange={(e) => handleTypeChange(box.id, `/${e.target.value}`)}
            >
              {items.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                >
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
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={"fr"}
            >
              <DatePicker
                label="Explotation start"
                format="DD/MM/YYYY"
                value={dayjs(box.date)}
                onChange={(date) => handleDateChange(box.id, dayjs(date).format('YYYY-MM-DD'))}
              />
            </LocalizationProvider>
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
