import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useApi from "../hooks/useApi";
import auth from "../api/auth";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const getAccessApi = useApi(auth.connectUser);
  const { login } = useAuth();

  useEffect(() => {
    if (getAccessApi.success) {
      console.log("Admin connecté avec succès !", getAccessApi.data);
      if (getAccessApi.data.accessToken) {
        const token = getAccessApi.data.accessToken;
        login(token, email);
        navigate("/");
      }
    } else if (getAccessApi.error) {
      console.log(
        "Problème connexion : ",
        getAccessApi.status,
        getAccessApi.problem
      );
      setError("Problème de connexion. Veuillez vérifier vos identifiants.");
      setLoading(false);
    }
  }, [getAccessApi.success, getAccessApi.error, getAccessApi.data, login]);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    getAccessApi.request(email, password);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {getAccessApi.loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="50vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleLogin}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Login;
