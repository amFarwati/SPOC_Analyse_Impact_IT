import React, { useState } from "react";
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

const Login = () => {
  const [mail, setMail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gérer la soumission du formulaire ici
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: "70%",
          height: "50%",
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
              disabled={!mail || !password || emailError}
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
