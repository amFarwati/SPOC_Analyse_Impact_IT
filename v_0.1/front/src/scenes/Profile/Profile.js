import React, { useState } from "react";
import { Button, TextField, Container, Avatar } from "@mui/material";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gérer la soumission du formulaire ici
  };

  const handleImageChange = (event) => {
    setProfilePic(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Avatar src={profilePic} />
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
          label="Mot de passe"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Mettre à jour
        </Button>
      </form>
    </Container>
  );
};

export default Profile;
