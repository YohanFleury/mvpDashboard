// src/pages/Contents.js

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const Contents = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const data = {
    contents: [
      {
        id: 1,
        title: "Content 1",
        creator: "john_doe",
        date: "2022-01-01",
        views: 500,
        likes: 50,
        comments: 10,
        status: "published",
      },
      {
        id: 2,
        title: "Content 2",
        creator: "jane_smith",
        date: "2022-02-15",
        views: 300,
        likes: 30,
        comments: 5,
        status: "reported",
      },
      // Ajoutez plus de contenus ici
    ],
  };

  const filteredContents = data.contents.filter(
    (content) =>
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Search Contents"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Creator</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Views</TableCell>
                  <TableCell>Likes</TableCell>
                  <TableCell>Comments</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredContents.map((content) => (
                  <TableRow key={content.id}>
                    <TableCell>{content.title}</TableCell>
                    <TableCell>{content.creator}</TableCell>
                    <TableCell>{content.date}</TableCell>
                    <TableCell>{content.views}</TableCell>
                    <TableCell>{content.likes}</TableCell>
                    <TableCell>{content.comments}</TableCell>
                    <TableCell>{content.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contents;
