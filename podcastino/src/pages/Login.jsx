import React from "react";
import { Container, Typography, TextField, Button } from "@mui/material";

const Login = () => {
  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>Login</Typography>
      <TextField fullWidth label="Email" margin="normal" />
      <TextField fullWidth label="Password" type="password" margin="normal" />
      <Button fullWidth variant="contained" color="primary">Login</Button>
    </Container>
  );
};

export default Login;