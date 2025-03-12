import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { Code, PersonAdd } from "@mui/icons-material";
import useApi from "../hooks/useApi";
import auth from "../api/auth";

const RegistrationManagement = () => {
  const [creatorName, setCreatorName] = useState("");

  // API
  const getCodeApi = useApi(auth.generateCode);

  const handleGenerateCode = () => {
    getCodeApi.request(creatorName);
  };

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      <Typography variant="h4" gutterBottom>
        Gestion des inscriptions
      </Typography>

      <Grid container spacing={3}>
        {/* Input pour le nom du créateur */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: "20px", backgroundColor: "#ffffff" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <PersonAdd fontSize="large" sx={{ color: "#3f51b5" }} />
                  <Typography variant="h6">
                    Ajouter un créateur et générer un code d'inscription
                  </Typography>
                </Box>
                <TextField
                  label="Nom du Créateur"
                  variant="outlined"
                  fullWidth
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGenerateCode}
                  fullWidth
                >
                  Générer le Code
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Affichage du code généré */}
        {getCodeApi.data.code && (
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: "20px", backgroundColor: "#ffffff" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Code fontSize="large" sx={{ color: "#4caf50" }} />
                    <Typography variant="h6">Code Généré</Typography>
                  </Box>
                  <Typography variant="h5" color="textPrimary">
                    {getCodeApi.data.code}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ textAlign: "center" }}
                  >
                    Partagez ce code avec {creatorName}. Il pourra l'utiliser
                    pour finaliser son inscription.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default RegistrationManagement;
