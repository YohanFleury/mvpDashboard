import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Paper,
  Avatar,
  Badge as MuiBadge,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  Email,
  Person,
  Event,
  VerifiedUser,
  Assignment,
  Description,
  Group,
} from "@mui/icons-material";
import useApi from "../hooks/useApi";
import users from "../api/users";
import CreatorPosts from "../components/CreatorPosts";
import SubscriptionsInfos from "../components/SubscriptionsInfos";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isCreator, setIsCreator] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const getUserByIdApi = useApi(users.getUserById);
  const getCreatorNumberSubApi = useApi(users.getCreatorNumberSub);
  const getSubscriptionsApi = useApi(users.getSubscriptions);
  const getPostsCountApi = useApi(users.getPublicationsCount);

  useEffect(() => {
    getUserByIdApi.request(id);
    getSubscriptionsApi.request(id);
  }, [id]);

  useEffect(() => {
    if (getUserByIdApi.success) {
      console.log("USER : ", getUserByIdApi.data);
      setIsCreator(!!getUserByIdApi.data.creator);
    } else if (getUserByIdApi.error) {
      console.log(
        "Error User not found",
        getUserByIdApi.status,
        getUserByIdApi.problem
      );
    }
  }, [getUserByIdApi.error, getUserByIdApi.success]);

  useEffect(() => {
    if (isCreator) {
      getCreatorNumberSubApi.request(id);
      getPostsCountApi.request(id);
    }
  }, [isCreator, id]);

  useEffect(() => {
    if (getCreatorNumberSubApi.success) {
      console.log("Subscribers : ", getCreatorNumberSubApi.data);
    } else if (getCreatorNumberSubApi.error) {
      console.log("Erreur subscribers number");
    }
  }, [getCreatorNumberSubApi.error, getCreatorNumberSubApi.success]);

  useEffect(() => {
    if (getPostsCountApi.success) {
      console.log("Number posts : ", getPostsCountApi.data);
    } else if (getPostsCountApi.error) {
      console.log("Erreur posts number");
    }
  }, [getPostsCountApi.error, getPostsCountApi.success]);

  useEffect(() => {
    if (getSubscriptionsApi.success) {
      console.log("Subscriptions : ", getSubscriptionsApi.data);
    } else if (getSubscriptionsApi.error) {
      console.log("Erreur subscriptions");
    }
  }, [getSubscriptionsApi.error, getSubscriptionsApi.success]);

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: "20px", borderRadius: "12px" }}>
            {getUserByIdApi.loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="200px"
              >
                <CircularProgress size={50} />
              </Box>
            ) : (
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={8} md={9}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <MuiBadge
                        badgeContent="creator"
                        color="primary"
                        invisible={!isCreator}
                        sx={{ marginBottom: 10 }}
                      >
                        <Avatar
                          src={getUserByIdApi.data.account?.picture}
                          sx={{ width: 100, height: 100 }}
                        />
                      </MuiBadge>
                    </Grid>
                    <Grid item>
                      <Typography variant="h4">
                        {getUserByIdApi.data.username}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {getUserByIdApi.data.creator?.description}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4} md={3} sx={{ textAlign: "right" }}>
                  <Typography variant="body2" color="textSecondary">
                    ID: {getUserByIdApi.data.id}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Email: {getUserByIdApi.data.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Signup Date: {getUserByIdApi.data.creationDate}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Paper>
        </Grid>

        {showPosts ? (
          <>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowPosts(false)}
              >
                Close
              </Button>
            </Grid>
            <Grid item xs={12}>
              <CreatorPosts id={id} />
            </Grid>
          </>
        ) : showSubscriptions ? (
          <>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowSubscriptions(false)}
              >
                Close
              </Button>
            </Grid>
            <Grid item xs={12}>
              <SubscriptionsInfos id={id} />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{ padding: "20px", borderRadius: "12px" }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={8} md={9}>
                    <Grid container spacing={2}>
                      {isCreator && (
                        <Grid item xs={12} md={6}>
                          <Card
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              padding: 2,
                              borderRadius: "12px",
                              cursor: "pointer",
                              "&:hover": {
                                backgroundColor: "#f0f0f0",
                              },
                            }}
                            onClick={() => setShowPosts(true)}
                          >
                            <Description sx={{ marginRight: 2 }} />
                            <CardContent>
                              <Typography variant="h6">Posts</Typography>
                              <Typography variant="body1">
                                {getPostsCountApi.loading ? (
                                  <CircularProgress size={24} />
                                ) : (
                                  getPostsCountApi.data?.count
                                )}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      )}
                      {isCreator && (
                        <Grid item xs={12} md={6}>
                          <Card
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              padding: 2,
                              borderRadius: "12px",
                            }}
                          >
                            <Group sx={{ marginRight: 2 }} />
                            <CardContent>
                              <Typography variant="h6">Subscribers</Typography>
                              <Typography variant="body1">
                                {getCreatorNumberSubApi.loading ? (
                                  <CircularProgress size={24} />
                                ) : (
                                  getCreatorNumberSubApi.data?.count
                                )}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      )}
                      <Grid item xs={12} md={6}>
                        <Card
                          onClick={() => setShowSubscriptions(true)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            padding: 2,
                            borderRadius: "12px",
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "#f0f0f0",
                            },
                          }}
                        >
                          <Assignment sx={{ marginRight: 2 }} />
                          <CardContent>
                            <Typography variant="h6">Subscriptions</Typography>
                            <Typography variant="body1">
                              {getSubscriptionsApi.loading ? (
                                <CircularProgress size={24} />
                              ) : (
                                getSubscriptionsApi.data?.length
                              )}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default UserDetails;
