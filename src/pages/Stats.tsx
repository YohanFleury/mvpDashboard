import React, { useEffect, useState } from "react";
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
  const getRevenueStatsApi = useApi(stats.getRevenueStats);

  // STATE
  const [globalStats, setGlobalStats] = useState({
    dateStats: "",
    nbCreators: 0,
    nbFans: 0,
    newCreatorsThisMonth: 0,
    newFansThisMonth: 0,
  });

  const [subscriptionsStats, setSubscriptionsStats] = useState({
    aboActifs: 0,
    expiredAboThisMonth: 0,
    newAboThisMonth: 0,
  });

  const [contentExStats, setContentExStats] = useState({
    nbSoldThisMonth: 0,
    nbTotalSold: 0,
  });

  const [revenueStats, setRevenueStats] = useState({
    revenuAboThisMonth: 0,
    revenuContentExThisMonth: 0,
    revenuTotalAbo: 0,
    revenuTotalContentEx: 0,
  });

  // EFFECTS
  useEffect(() => {
    getGlobalStatsApi.request();
    getSubscriptionsStatsApi.request();
    getExclusifContentStatsApi.request();
    getRevenueStatsApi.request();
  }, []);

  useEffect(() => {
    if (getExclusifContentStatsApi.success) {
      console.log("Content ex : ", getExclusifContentStatsApi.data);
      setContentExStats(getExclusifContentStatsApi.data);
    } else if (getExclusifContentStatsApi.error) {
      console.log(
        "Erreur get content ex : ",
        getExclusifContentStatsApi.status,
        getExclusifContentStatsApi.problem
      );
    }
  }, [getExclusifContentStatsApi.success, getExclusifContentStatsApi.error]);

  useEffect(() => {
    if (getRevenueStatsApi.success) {
      console.log("Revenus stats : ", getRevenueStatsApi.data);
      setRevenueStats(getRevenueStatsApi.data);
    } else if (getRevenueStatsApi.error) {
      console.log(
        "Erreur get content ex : ",
        getRevenueStatsApi.status,
        getRevenueStatsApi.problem
      );
    }
  }, [getRevenueStatsApi.success, getRevenueStatsApi.error]);

  useEffect(() => {
    if (getGlobalStatsApi.success) {
      console.log("Stats globales : ", getGlobalStatsApi.data);
      setGlobalStats(getGlobalStatsApi.data);
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
      setSubscriptionsStats(getSubscriptionsStatsApi.data);
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
    { name: "Abonnements", value: revenueStats.revenuTotalAbo },
    { name: "Contenus Exclusifs", value: revenueStats.revenuTotalContentEx },
  ];

  const cardData = [
    {
      title: "Utilisateurs",
      value: globalStats.nbCreators + globalStats.nbFans,
      icon: <People />,
      color: "#1976d2",
    },
    {
      title: "Nouveaux utilisateurs (ce mois)",
      value: globalStats.newCreatorsThisMonth + globalStats.newFansThisMonth,
      icon: <Person />,
      color: "#1976d2",
    },
    {
      title: "Créateurs",
      value: globalStats.nbCreators,
      icon: <Group />,
      color: "#ff5722",
    },
    {
      title: "Nouveaux créateurs (ce mois)",
      value: globalStats.newCreatorsThisMonth,
      icon: <Person />,
      color: "#ff5722",
    },
    {
      title: "Revenu Total",
      value: (
        revenueStats.revenuTotalAbo + revenueStats.revenuTotalContentEx
      ).toFixed(2),
      icon: <AttachMoney />,
      color: "#4caf50",
    },
    {
      title: "Revenu Mensuel",
      value: (
        revenueStats.revenuAboThisMonth + revenueStats.revenuContentExThisMonth
      ).toFixed(2),
      icon: <AttachMoney />,
      color: "#4caf50",
    },

    {
      title: "Revenu Total",
      value: revenueStats.revenuTotalAbo.toFixed(2),
      icon: <AttachMoney />,
      color: "#4caf50",
    },
    {
      title: "Revenu Mensuel",
      value: revenueStats.revenuAboThisMonth.toFixed(2),
      icon: <AttachMoney />,
      color: "#4caf50",
    },
    {
      title: "Actifs",
      value: subscriptionsStats.aboActifs,
      icon: <PersonAdd />,
      color: "#1976d2",
    },
    {
      title: "Nouveaux abonnements (ce mois)",
      value: subscriptionsStats.newAboThisMonth,
      icon: <TrendingUp />,
      color: "#1976d2",
    },
    {
      title: "Annulés",
      value: subscriptionsStats.expiredAboThisMonth,
      icon: <RemoveCircle />,
      color: "#d32f2f",
    },
    {
      title: "Revenu Total",
      value: revenueStats.revenuTotalContentEx.toFixed(2),
      icon: <AttachMoney />,
      color: "#4caf50",
    },
    {
      title: "Revenu Mensuel",
      value: revenueStats.revenuContentExThisMonth,
      icon: <AttachMoney />,
      color: "#4caf50",
    },
    {
      title: "Vendus (Total)",
      value: contentExStats.nbTotalSold.toFixed(0),
      icon: <Money />,
      color: "#ffa000",
    },
    {
      title: "Vendus ce mois",
      value: contentExStats.nbSoldThisMonth,
      icon: <Money />,
      color: "#ffa000",
    },
  ];

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      {/* User Stats */}
      <Typography variant="h4" gutterBottom>
        General
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
        Abonnements
      </Typography>
      <Grid container spacing={3}>
        {cardData.slice(6, 11).map((card, index) => (
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
        Contenus Exclusifs
      </Typography>
      <Grid container spacing={3}>
        {cardData.slice(11, 15).map((card, index) => (
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
            Répartition des revenus
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
