import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import useApi from "../hooks/useApi";
import users from "../api/users";

interface CreatorPostsProps {
  id: any;
}
type picturesInfos = {
  url: string;
  height: number;
  width: number;
};
type Publication = {
  author: {
    id: number;
    username: string;
    description: string;
    bgImageUrl: string;
    pictureUrl: string;
  };
  content: string;
  id: number;
  liked: boolean;
  nbComments: number;
  nbLikes: number;
  visible: boolean;
  creationDate: any;
  nbPictures: number;
  pictureUrls: picturesInfos[];
  saved: boolean;
};

const CreatorPosts = ({ id }: CreatorPostsProps) => {
  const getCreatorPostApi = useApi(users.getCreatorPosts);

  useEffect(() => {
    getCreatorPostApi.request(id);
  }, [id]);

  useEffect(() => {
    if (getCreatorPostApi.success) {
      console.log("Posts : ", getCreatorPostApi.data);
    } else if (getCreatorPostApi.error) {
      console.log(
        "Erreur get posts : ",
        getCreatorPostApi.status,
        getCreatorPostApi.problem
      );
    }
  }, [getCreatorPostApi.success, getCreatorPostApi.error]);

  const calculateImageSize = (width: number, height: number) => {
    const maxHeight = 600;
    if (height > maxHeight) {
      const ratio = maxHeight / height;
      return { width: width * ratio, height: maxHeight };
    }
    return { width, height };
  };

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      {getCreatorPostApi.loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress size={50} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {getCreatorPostApi.data.map((post: Publication) => (
            <Grid item xs={12} key={post.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        {new Date(post.creationDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {post.nbLikes} likes, {post.nbComments} comments
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1">{post.content}</Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 2 }}>
                    {post.pictureUrls.map((picture, index) => {
                      const { width, height } = calculateImageSize(
                        picture.width,
                        picture.height
                      );
                      return (
                        <CardMedia
                          key={index}
                          component="img"
                          height={height}
                          image={picture.url}
                          alt={`Post image ${index + 1}`}
                          sx={{ width, margin: 1 }}
                        />
                      );
                    })}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CreatorPosts;
