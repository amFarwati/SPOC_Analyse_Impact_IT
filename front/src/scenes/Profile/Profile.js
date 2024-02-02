import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Avatar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Profile = ({ setProfilePic }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasLetter, setHasLetter] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
  const [waitingRes, setWaitingRes] = useState(false);

  const passwordsMatch = password === confirmPassword;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gérer la soumission du formulaire ici
    setWaitingRes(true);
    setProfilePic(selectedImage);
  };

  const handleImageChange = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
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

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Avatar src={selectedImage} />
        <input type="file" onChange={handleImageChange} />
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
              emailRegex.test(e.target.value) ? "" : "Format d'e-mail invalide"
            );
          }}
          margin="normal"
          fullWidth
          size="large"
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          label="Ancien mot de passe"
          variant="outlined"
          type={showOldPassword ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
          margin="normal"
          fullWidth
          size="large"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowOldPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Nouveau mot de passe"
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
          label="Confirmer nouveau le mot de passe"
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
          disabled={
            !oldPassword ||
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
          Mettre à jour
        </Button>
      </form>
    </Container>
  );
};

export default Profile;
