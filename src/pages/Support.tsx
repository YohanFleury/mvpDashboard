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
import useApi from "../hooks/useApi";
import support from "../api/support";
import { Ticket } from "./TicketDetails";

const Support = () => {
  const [loading, setLoading] = useState(true);
  const [filteredTickets, setFilteredTickets] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [ticketsList, setTicketsList] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  // API
  const getTicketsApi = useApi(support.getTickets);
  const getFilteredTicketsApi = useApi(support.getFilteredTickets);

  useEffect(() => {}, []);

  useEffect(() => {
    if (statusFilter === "all") {
      getTicketsApi.request();
    } else {
      getFilteredTicketsApi.request(statusFilter);
    }
  }, [statusFilter]);

  useEffect(() => {
    if (getTicketsApi.success) {
      console.log("Liste des tickets : ", getTicketsApi.data);
      setTicketsList(getTicketsApi.data);
    } else if (getTicketsApi.error) {
      console.log("erreur recup liste tickets");
    }
  }, [getTicketsApi.success, getTicketsApi.error]);

  useEffect(() => {
    if (getFilteredTicketsApi.success) {
      console.log("Liste des tickets filtrés : ", getFilteredTicketsApi.data);
      setTicketsList(getFilteredTicketsApi.data);
    } else if (getFilteredTicketsApi.error) {
      console.log("erreur recup liste tickets");
    }
  }, [getFilteredTicketsApi.success, getFilteredTicketsApi.error]);

  // Données factices

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
      {getTicketsApi.loading ? (
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
                <Typography variant="h4">{0}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">New Tickets</Typography>
                <Typography variant="h4">{0}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Open Tickets</Typography>
                <Typography variant="h4">{0}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending Tickets</Typography>
                <Typography variant="h4">{0}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Resolved Tickets</Typography>
                <Typography variant="h4">{0}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Closed Tickets</Typography>
                <Typography variant="h4">{0}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Filter Buttons */}
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <Button
              variant={statusFilter === "all" ? "contained" : "outlined"}
              onClick={() => setStatusFilter("all")}
              sx={{ marginRight: 1 }}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "new" ? "contained" : "outlined"}
              onClick={() => setStatusFilter("new")}
              sx={{ marginRight: 1 }}
            >
              New
            </Button>
            <Button
              variant={statusFilter === "open" ? "contained" : "outlined"}
              onClick={() => setStatusFilter("open")}
              sx={{ marginRight: 1 }}
            >
              Open
            </Button>
            <Button
              variant={statusFilter === "pending" ? "contained" : "outlined"}
              onClick={() => setStatusFilter("pending")}
              sx={{ marginRight: 1 }}
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === "resolved" ? "contained" : "outlined"}
              onClick={() => setStatusFilter("resolved")}
              sx={{ marginRight: 1 }}
            >
              Resolved
            </Button>
            <Button
              variant={statusFilter === "closed" ? "contained" : "outlined"}
              onClick={() => setStatusFilter("closed")}
            >
              Closed
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
                    {ticketsList.map((ticket) => (
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
                            label={ticket.status.libelle}
                            color={getStatusColor(ticket.status.libelle)}
                          />
                        </TableCell>
                        <TableCell>{ticket.priority.libelle}</TableCell>
                        <TableCell>
                          {new Date(ticket.creationdDateTimes).toLocaleString()}
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
