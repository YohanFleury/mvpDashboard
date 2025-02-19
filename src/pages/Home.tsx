// src/pages/Home.js
import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import {
  People,
  Group,
  Subscriptions,
  MonetizationOn,
  AttachMoney,
  ErrorOutline,
} from "@mui/icons-material";

const Home = () => {
  const data = {
    totalUsers: 5000,
    totalCreators: 500,
    currentSubscriptions: 4500,
    monthlyRevenue: 15000,
    totalRevenue: 200000,
    issues: 3,
  };

  const cardData = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: <People fontSize="large" />,
      color: "#3f51b5",
    },
    {
      title: "Total Creators",
      value: data.totalCreators,
      icon: <Group fontSize="large" />,
      color: "#9c27b0",
    },
    {
      title: "Current Subscriptions",
      value: data.currentSubscriptions,
      icon: <Subscriptions fontSize="large" />,
      color: "#009688",
    },
    {
      title: "Monthly Revenue",
      value: `$${data.monthlyRevenue}`,
      icon: <MonetizationOn fontSize="large" />,
      color: "#4caf50",
    },
    {
      title: "Total Revenue",
      value: `$${data.totalRevenue}`,
      icon: <AttachMoney fontSize="large" />,
      color: "#ff9800",
    },
    {
      title: "Issues",
      value: data.issues,
      icon: <ErrorOutline fontSize="large" />,
      color: "#f44336",
    },
  ];

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                backgroundColor: "#ffffff",
              }}
            >
              <Box sx={{ marginRight: "15px", color: card.color }}>
                {card.icon}
              </Box>
              <CardContent>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="h4">{card.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
