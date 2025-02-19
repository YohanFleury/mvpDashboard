import React, { useEffect } from "react";
import { Card, CardContent, Typography, Grid, Box, Paper } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  AttachMoney,
  PersonAdd,
  RemoveCircle,
  Money,
  TrendingUp,
  People,
  Group,
  Person,
} from "@mui/icons-material";
import useApi from "../hooks/useApi";
import stats from "../api/stats";

const Stats = () => {
  // API
  const getGlobalStatsApi = useApi(stats.getGlobalStats);
  const getSubscriptionsStatsApi = useApi(stats.getSubscriptionsStats);
  const getExclusifContentStatsApi = useApi(stats.getExclusifContentStats);

  // EFFECTS
  useEffect(() => {
    getGlobalStatsApi.request();
    getSubscriptionsStatsApi.request();
    getExclusifContentStatsApi.request();
  }, []);

  useEffect(() => {
    if (getExclusifContentStatsApi.success) {
      console.log("Content ex : ", getExclusifContentStatsApi.data);
    } else if (getExclusifContentStatsApi.error) {
      console.log(
        "Erreur get content ex : ",
        getExclusifContentStatsApi.status,
        getExclusifContentStatsApi.problem
      );
    }
  }, [getExclusifContentStatsApi.success, getExclusifContentStatsApi.error]);

  useEffect(() => {
    if (getGlobalStatsApi.success) {
      console.log("Stats globales : ", getGlobalStatsApi.data);
    } else if (getGlobalStatsApi.error) {
      console.log(
        "Erreur get global stats : ",
        getGlobalStatsApi.status,
        getGlobalStatsApi.problem
      );
    }
  }, [getGlobalStatsApi.success, getGlobalStatsApi.error]);

  useEffect(() => {
    if (getSubscriptionsStatsApi.success) {
      console.log("Abonnements stats : ", getSubscriptionsStatsApi.data);
    } else if (getSubscriptionsStatsApi.error) {
      console.log(
        "Erreur get Abonnements stats: ",
        getSubscriptionsStatsApi.status,
        getSubscriptionsStatsApi.problem
      );
    }
  }, [getSubscriptionsStatsApi.success, getSubscriptionsStatsApi.error]);

  const totalUsers = 238541;
  const newUsers = 5000;
  const totalCreators = Math.round(totalUsers * 0.005);
  const newCreators = Math.round(newUsers * 0.005);

  const data = {
    totalUsers: totalUsers,
    newUsers: newUsers,
    totalCreators: totalCreators,
    newCreators: newCreators,
    totalSubscriptions: 4500,
    newSubscriptions: 120,
    cancellations: 30,
    monthlyRevenue: 15000,
    totalRevenue: 200000,
    contentRevenue: 50000,
    subscriptionRevenue: 150000,
    totalPaidContent: 300,
    monthlyPaidContent: 50,
    paidContentMonthlyRevenue: 10000,
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const pieData = [
    { name: "Subscription Revenue", value: data.subscriptionRevenue },
    { name: "Content Revenue", value: data.contentRevenue },
  ];

  const cardData = [
    {
      title: "Total Users",
      value: data.totalUsers.toLocaleString(),
      icon: <People />,
      color: "#1976d2",
    },
    {
      title: "New Users (This Month)",
      value: data.newUsers.toLocaleString(),
      icon: <Person />,
      color: "#1976d2",
    },
    {
      title: "Total Creators",
      value: data.totalCreators.toLocaleString(),
      icon: <Group />,
      color: "#ff5722",
    },
    {
      title: "New Creators (This Month)",
      value: data.newCreators.toLocaleString(),
      icon: <Person />,
      color: "#ff5722",
    },
    {
      title: "Monthly Revenue",
      value: `${data.monthlyRevenue.toLocaleString()}`,
      icon: <AttachMoney />,
      color: "#4caf50",
    },
    {
      title: "Total Revenue",
      value: `${data.totalRevenue.toLocaleString()}`,
      icon: <AttachMoney />,
      color: "#4caf50",
    },
    {
      title: "Subscription Revenue",
      value: `${data.subscriptionRevenue.toLocaleString()}`,
      icon: <AttachMoney />,
      color: "#4caf50",
    },
    {
      title: "Current Subscriptions",
      value: data.totalSubscriptions.toLocaleString(),
      icon: <PersonAdd />,
      color: "#1976d2",
    },
    {
      title: "New Subscriptions",
      value: data.newSubscriptions.toLocaleString(),
      icon: <TrendingUp />,
      color: "#1976d2",
    },
    {
      title: "Cancellations",
      value: data.cancellations.toLocaleString(),
      icon: <RemoveCircle />,
      color: "#d32f2f",
    },
    {
      title: "Content Revenue",
      value: `${data.contentRevenue.toLocaleString()}`,
      icon: <AttachMoney />,
      color: "#4caf50",
    },
    {
      title: "Total Paid Contents",
      value: data.totalPaidContent.toLocaleString(),
      icon: <Money />,
      color: "#ffa000",
    },
    {
      title: "Monthly Paid Contents",
      value: data.monthlyPaidContent.toLocaleString(),
      icon: <Money />,
      color: "#ffa000",
    },
    {
      title: "Paid Content Monthly Revenue",
      value: `${data.paidContentMonthlyRevenue.toLocaleString()}`,
      icon: <AttachMoney />,
      color: "#4caf50",
    },
  ];

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      {/* User Stats */}
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <Grid container spacing={3}>
        {cardData.slice(0, 6).map((card, index) => (
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

      {/* Subscription Stats */}
      <Typography variant="h4" gutterBottom sx={{ marginTop: "30px" }}>
        Subscriptions
      </Typography>
      <Grid container spacing={3}>
        {cardData.slice(6, 10).map((card, index) => (
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

      {/* Paid Content Stats */}
      <Typography variant="h4" gutterBottom sx={{ marginTop: "30px" }}>
        Exclusifs contents
      </Typography>
      <Grid container spacing={3}>
        {cardData.slice(10, 14).map((card, index) => (
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

      {/* Revenue Distribution */}
      <Grid item xs={12} sx={{ marginTop: "30px" }}>
        <Paper elevation={3} sx={{ padding: "20px", borderRadius: "12px" }}>
          <Typography variant="h6" gutterBottom>
            Revenue Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Box>
  );
};

export default Stats;
