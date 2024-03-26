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

const Login = ({
  setLogin,
  setToken,
  server_URL,
  setIsLogged,
  setIsDeconnected,
}) => {
  const [mail, setMail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [waitingRes, setWaitingRes] = useState(false);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setWaitingRes(true);

    let data = {
      mail: mail,
      password: password,
    };

    axios
      .put(`${server_URL}/login`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data === `notInBd`) {;

          setMsg("Cet email n'est pas enregistré");
          setOpen(true);

        } else if (res.data === `rejected`) {

          setMsg("Mot de passe incorrect");
          setOpen(true);

        } else {

          setToken(res.data);
          setLogin(mail);
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
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AlertDialog
        msg={msg}
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
            Connexion
          </Typography>
          <form onSubmit={handleSubmit}>
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
              onChange={(e) => setPassword(e.target.value)}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px", fontSize: "20px" }}
              disabled={!mail || !password || emailError || waitingRes}
            >
              Connexion
            </Button>
            <Box style={{ marginTop: "20px" }}>
              <Link to="/inscription">
                Vous n'avez pas de compte? Créez-le ^^
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
