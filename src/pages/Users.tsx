import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Avatar,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { People, Person, Group } from "@mui/icons-material";
import useApi from "../hooks/useApi";
import users from "../api/users";

type UserInfos = {
  account: {
    birthdate: string;
    picture: string;
  };
  creator?: {
    certified: boolean;
    description: string;
    image: string;
  };
  displayName: string;
  email: string;
  id: number;
  username: string;
};

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const getUserByEmail = useApi(users.getUserByEmail);

  useEffect(() => {
    if (getUserByEmail.success) {
      console.log("User trouvé : ", getUserByEmail.data);
    } else if (getUserByEmail.error) {
      console.log(
        "User NON trouvé : ",
        getUserByEmail.status,
        getUserByEmail.problem
      );
    }
  }, [getUserByEmail.success, getUserByEmail.error]);

  const searchUser = () => {
    getUserByEmail.request(searchTerm);
  };

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      <Grid container spacing={3}>
        {/* Search and Filters */}
        <Grid item xs={12} md={10}>
          <TextField
            fullWidth
            label="Search Users"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "5px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#1976d2",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            onClick={searchUser}
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              height: "100%",
              mt: { xs: 2, md: 0 },
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#155a9d",
              },
            }}
          >
            Search
          </Button>
        </Grid>

        {/* User Information */}
        {getUserByEmail.loading && (
          <Grid item xs={12} display="flex" justifyContent="center">
            <CircularProgress />
          </Grid>
        )}

        {!getUserByEmail.loading && getUserByEmail.error && (
          <Grid item xs={12}>
            <Typography variant="h6" color="error" align="center">
              User not found.
            </Typography>
          </Grid>
        )}

        {getUserByEmail.data.id && (
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "20px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
              onClick={() => navigate(`/users/${getUserByEmail.data.id}`)}
            >
              <Avatar
                src={getUserByEmail.data.account?.picture}
                alt={getUserByEmail.data.username}
                sx={{ width: 56, height: 56, marginRight: "20px" }}
              />
              <Box>
                <Typography variant="h6">
                  {getUserByEmail.data.displayName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {getUserByEmail.data.username}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {getUserByEmail.data.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {getUserByEmail.data.id}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Users;
