import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";

const Support = () => {
  const [loading, setLoading] = useState(true);
  const [filteredTickets, setFilteredTickets] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  // Données factices
  const tickets = [
    {
      id: 1,
      subject: "Login Issue",
      status: "open",
      priority: "high",
      created_at: "2024-07-01T10:00:00Z",
    },
    {
      id: 2,
      subject: "Payment Failed",
      status: "pending",
      priority: "medium",
      created_at: "2024-07-02T12:30:00Z",
    },
    {
      id: 3,
      subject: "Bug Report",
      status: "resolved",
      priority: "low",
      created_at: "2024-07-03T14:45:00Z",
    },
    {
      id: 4,
      subject: "Account Deletion Request",
      status: "open",
      priority: "high",
      created_at: "2024-07-04T16:00:00Z",
    },
    {
      id: 5,
      subject: "Feature Request",
      status: "resolved",
      priority: "low",
      created_at: "2024-07-05T18:15:00Z",
    },
  ];

  useEffect(() => {
    setLoading(false); // Simule l'appel API
    setFilteredTickets(tickets);
  }, []);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredTickets(tickets);
    } else {
      setFilteredTickets(
        tickets.filter((ticket) => ticket.status === statusFilter)
      );
    }
  }, [statusFilter]);

  const ticketStats = {
    total: tickets.length,
    open: tickets.filter((ticket) => ticket.status === "open").length,
    pending: tickets.filter((ticket) => ticket.status === "pending").length,
    resolved: tickets.filter((ticket) => ticket.status === "resolved").length,
  };

  const barData = {
    labels: ["Total", "Open", "Pending", "Resolved"],
    datasets: [
      {
        label: "Ticket Status",
        backgroundColor: ["#3f51b5", "#ff9800", "#f44336", "#4caf50"],
        data: [
          ticketStats.total,
          ticketStats.open,
          ticketStats.pending,
          ticketStats.resolved,
        ],
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "primary";
      case "pending":
        return "warning";
      case "resolved":
        return "success";
      default:
        return "default";
    }
  };

  const handleRowClick = (id: number) => {
    navigate(`/ticket/${id}`);
  };

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Ticket Statistics */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Tickets</Typography>
                <Typography variant="h4">{ticketStats.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Open Tickets</Typography>
                <Typography variant="h4">{ticketStats.open}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending Tickets</Typography>
                <Typography variant="h4">{ticketStats.pending}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Resolved Tickets</Typography>
                <Typography variant="h4">{ticketStats.resolved}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Filter Buttons */}
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setStatusFilter("all")}
              sx={{ marginRight: 1 }}
            >
              All
            </Button>
            <Button
              variant="outlined"
              onClick={() => setStatusFilter("open")}
              sx={{ marginRight: 1 }}
            >
              Open
            </Button>
            <Button
              variant="outlined"
              onClick={() => setStatusFilter("pending")}
              sx={{ marginRight: 1 }}
            >
              Pending
            </Button>
            <Button
              variant="outlined"
              onClick={() => setStatusFilter("resolved")}
            >
              Resolved
            </Button>
          </Grid>

          {/* Bar Chart */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: "20px", borderRadius: "12px" }}>
              <Typography variant="h6" gutterBottom>
                Ticket Status Overview
              </Typography>
              {/* <Bar data={barData} /> */}
            </Paper>
          </Grid>

          {/* Ticket Table */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: "20px", borderRadius: "12px" }}>
              <Typography variant="h6" gutterBottom>
                Recent Tickets
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Created At</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow
                        key={ticket.id}
                        onClick={() => handleRowClick(ticket.id)}
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#f0f0f0",
                          },
                        }}
                      >
                        <TableCell>{ticket.id}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <Chip
                            label={ticket.status}
                            color={getStatusColor(ticket.status)}
                          />
                        </TableCell>
                        <TableCell>{ticket.priority}</TableCell>
                        <TableCell>
                          {new Date(ticket.created_at).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Support;
