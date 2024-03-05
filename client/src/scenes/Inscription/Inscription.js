import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Container,
  Card,
  CardContent,
  Typography,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlertDialog from "../../components/AlertDialogSlide";
import axios from "redaxios";

const Inscription = ({
  setLogin,
  setToken,
  server_URL,
  setIsLogged,
  setIsDeconnected,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [organisme, setOrganisme] = useState(""); // à faire plus tard

  const [mail, setMail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasLetter, setHasLetter] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);

  const [waitingRes, setWaitingRes] = useState(false);
  const [open, setOpen] = useState(false);

  const passwordsMatch = password === confirmPassword;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gérer la soumission du formulaire ici

    setWaitingRes(true);

    console.log(`inscription de ${mail} avec le mot de passe ${password}`);
    setLogin(mail);

    console.log(`/setUser server_URL ${mail} =>`);
    let data = {
      mail: mail,
      password: password,
      name: `${firstName} ${lastName}`,
    };

    axios
      .put(`${server_URL}/setUser`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data === `Already in the BD`) {
          setOpen(true);
        } else {
          setToken(res.data);
          setIsDeconnected(false);
          setIsLogged(true);
        }

        setWaitingRes(false);
      })
      .catch((error) => {
        // Gestion des erreurs
        console.error("Erreur de redaxios:", error.message);
        setWaitingRes(false);
      });
  };

  const checkPassword = (password) => {
    setHasNumber(/\d/.test(password));
    setHasSpecialChar(
      /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)
    );
    setHasLetter(/[a-z]/i.test(password));
    setHasUppercase(/[A-Z]/.test(password));
    setHasMinLength(password.length >= 8);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setIsLogged(false);
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AlertDialog
        msg="Un utilisateur utilise déjà cette email"
        open={open}
        setOpen={setOpen}
      />
      <Card
        style={{
          width: "70%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardContent>
          <Typography
            variant="h1"
            component="div"
            style={{ marginBottom: "20px" }}
          >
            Inscription
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Prénom"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Nom"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Email"
              variant="outlined"
              value={mail}
              onChange={(e) => {
                setMail(e.target.value);
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                setEmailError(
                  emailRegex.test(e.target.value)
                    ? ""
                    : "Format d'e-mail invalide"
                );
              }}
              margin="normal"
              fullWidth
              size="large"
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              label="Mot de passe"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPassword(e.target.value);
              }}
              margin="normal"
              fullWidth
              size="large"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirmer le mot de passe"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              fullWidth
              size="large"
            />
            <ul>
              <li style={{ color: hasNumber ? "green" : "red" }}>
                Doit contenir un chiffre
              </li>
              <li style={{ color: hasSpecialChar ? "green" : "red" }}>
                Doit contenir un caractère spécial
              </li>
              <li style={{ color: hasLetter ? "green" : "red" }}>
                Doit contenir une minuscule
              </li>
              <li style={{ color: hasUppercase ? "green" : "red" }}>
                Doit contenir une majuscule
              </li>
              <li style={{ color: hasMinLength ? "green" : "red" }}>
                Doit faire au moins 8 caractères
              </li>
            </ul>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px", fontSize: "20px" }}
              disabled={
                !passwordsMatch ||
                !mail ||
                !hasLetter ||
                !hasMinLength ||
                !hasNumber ||
                !hasSpecialChar ||
                !hasUppercase ||
                emailError ||
                waitingRes
              }
            >
              S'inscrire
            </Button>
            <Box style={{ marginTop: "20px" }}>
              <Link to="/connexion">
                Vous avez déjà un compte? Connectez-vous ^^
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Inscription;
