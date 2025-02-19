// src/pages/UserPosts.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Paper,
  Avatar,
} from "@mui/material";
import useApi from "../hooks/useApi";
import users from "../api/users";

const UserPosts = () => {
  const { id } = useParams();

  const getUserByIdApi = useApi(users.getUserById);

  useEffect(() => {
    getUserByIdApi.request(id);
  }, [id]);

  useEffect(() => {
    if (getUserByIdApi.success) {
      console.log("USER : ", getUserByIdApi.data);
    } else if (getUserByIdApi.error) {
      console.log(
        "Error User not found",
        getUserByIdApi.status,
        getUserByIdApi.problem
      );
    }
  }, [getUserByIdApi.error, getUserByIdApi.success]);

  const user = {
    id: 1,
    username: "John Doe",
    description: "Content creator",
    bgImageUrl: "",
    pictureUrl:
      "https://usersaccountphotos.s3.eu-west-3.amazonaws.com/145437b0-02fd-49a9-935e-4093aa702d31-108_profil.jpg",
  };

  const posts = [
    {
      id: 1,
      author: user,
      content: "This is a sample post content.",
      liked: false,
      nbComments: 10,
      nbLikes: 50,
      visible: true,
      creationDate: "2022-01-01",
      nbPictures: 1,
      pictureUrls: [
        {
          url: "https://via.placeholder.com/150",
          description: "Sample picture",
        },
      ],
      saved: false,
    },
    // Ajoutez plus de publications ici
  ];

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: "20px", borderRadius: "12px" }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar
                  src={getUserByIdApi.data.account?.picture}
                  sx={{ width: 90, height: 90 }}
                />
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
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: "20px", borderRadius: "12px" }}>
            <Grid container spacing={3}>
              {posts.map((post) => (
                <Grid item xs={12} key={post.id}>
                  <Card sx={{ padding: 2, borderRadius: "12px" }}>
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        {new Date(post.creationDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {post.content}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        Likes: {post.nbLikes} | Comments: {post.nbComments}
                      </Typography>
                      <Grid container spacing={2}>
                        {post.pictureUrls.map((picture, index) => (
                          <Grid item key={index}>
                            <img
                              src={picture.url}
                              alt={picture.description}
                              style={{
                                width: "180px",
                                height: "230px",
                                objectFit: "cover",
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserPosts;
