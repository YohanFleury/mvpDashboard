import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Paper,
  Button,
  CircularProgress,
  Avatar,
  IconButton,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Save, Send, ExpandMore } from "@mui/icons-material";
import useApi from "../hooks/useApi";
import support from "../api/support";

export type Ticket = {
  content: string;
  creationdDateTimes: string;
  emailUser: string;
  id: number;
  priority: {
    code: number;
    libelle: string;
  };
  status: {
    code: number;
    libelle: string;
  };
  subject: string;
};

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // API
  const getTicketDetailApi = useApi(support.getTicketDetail);
  const updateTicketApi = useApi(support.updateTicket);

  useEffect(() => {
    getTicketDetailApi.request(id);
  }, []);

  useEffect(() => {
    if (getTicketDetailApi.success) {
      console.log("Détail du ticket : ", getTicketDetailApi.data);
      setTicket(getTicketDetailApi.data);
    } else if (getTicketDetailApi.error) {
      console.log(
        "Erreur get ticket : ",
        getTicketDetailApi.problem,
        getTicketDetailApi.status
      );
    }
  }, [getTicketDetailApi.success, getTicketDetailApi.error]);

  useEffect(() => {
    if (updateTicketApi.success) {
      console.log("Ticket updated !", updateTicketApi.data);
    } else if (updateTicketApi.error) {
      console.log(
        "Error updated ticket ",
        updateTicketApi.problem,
        updateTicketApi.status
      );
    }
  }, [updateTicketApi.success, updateTicketApi.error]);

  // Mise à jour du status du ticket
  const handleStatusUpdate = (code: number, libelle: string) => {
    setTicket((prevTicket) => {
      if (!prevTicket) return prevTicket;
      return {
        ...prevTicket,
        status: {
          code,
          libelle,
        },
      };
    });
  };

  // Mise à jour de la priority du ticket
  const handlePriorityUpdate = (code: number, libelle: string) => {
    setTicket((prevTicket) => {
      if (!prevTicket) return prevTicket;
      return {
        ...prevTicket,
        priority: {
          code,
          libelle,
        },
      };
    });
  };

  // Lorsque l'utilisateur clique sur un status, on met à jour le ticket
  const handleStatusChange = (event: any, newStatus: string) => {
    if (newStatus !== null) {
      const statusMapping: {
        [key: string]: { code: number; libelle: string };
      } = {
        new: { code: 1, libelle: "New" },
        open: { code: 2, libelle: "Open" },
        pending: { code: 3, libelle: "Pending" },
        resolved: { code: 4, libelle: "Resolved" },
        closed: { code: 5, libelle: "Closed" },
      };
      const newStatusObj = statusMapping[newStatus];
      if (newStatusObj) {
        handleStatusUpdate(newStatusObj.code, newStatusObj.libelle);
      }
    }
  };

  // Lorsque l'utilisateur clique sur une priority, on met à jour le ticket
  const handlePriorityChange = (event: any, newPriority: string) => {
    if (newPriority !== null) {
      const priorityMapping: {
        [key: string]: { code: number; libelle: string };
      } = {
        low: { code: 1, libelle: "Low" },
        medium: { code: 2, libelle: "Medium" },
        high: { code: 3, libelle: "High" },
      };
      const newPriorityObj = priorityMapping[newPriority];
      if (newPriorityObj) {
        handlePriorityUpdate(newPriorityObj.code, newPriorityObj.libelle);
      }
    }
  };

  const updateTicket = () => {
    updateTicketApi.request(ticket);
  };

  const handleResponseChange = (event: any) => {
    setResponse(event.target.value);
  };

  const handleSubmitResponse = () => {
    console.log("Response:", response);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const maxContentLength = 300;

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      {getTicketDetailApi.loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <CircularProgress />
        </Box>
      )}
      {ticket && !getTicketDetailApi.loading && (
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: "20px", borderRadius: "12px" }}>
              <Box display="flex" alignItems="center" marginBottom="20px">
                <Avatar sx={{ marginRight: "10px", bgcolor: "#1976d2" }}>
                  {ticket?.emailUser}
                </Avatar>
                <Typography variant="h4">Ticket Details</Typography>
              </Box>
              <Grid container spacing={2}>
                {[
                  { label: "Ticket ID", value: ticket.id },
                  { label: "Email", value: ticket.emailUser },
                  { label: "Subject", value: ticket.subject },
                ].map((detail, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card sx={{ borderRadius: "12px", padding: "10px" }}>
                      <CardContent>
                        <Typography variant="h6">{detail.label}</Typography>
                        <Typography variant="body1">{detail.value}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      padding: "10px",
                      height: "auto",
                      minHeight: "150px",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6">Content</Typography>
                      <Typography variant="body1">
                        {ticket.content.length > maxContentLength ? (
                          <>
                            {ticket.content.substring(0, maxContentLength)}...
                            <IconButton
                              onClick={handleOpenModal}
                              color="primary"
                            >
                              <ExpandMore />
                            </IconButton>
                          </>
                        ) : (
                          ticket.content
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Status</Typography>
                  <ToggleButtonGroup
                    value={ticket.status.libelle.toLowerCase()}
                    exclusive
                    onChange={handleStatusChange}
                    fullWidth
                    color="primary"
                  >
                    <ToggleButton value="new">New</ToggleButton>
                    <ToggleButton value="open">Open</ToggleButton>
                    <ToggleButton value="pending">Pending</ToggleButton>
                    <ToggleButton value="resolved">Resolved</ToggleButton>
                    <ToggleButton value="closed">Closed</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Priority</Typography>
                  <ToggleButtonGroup
                    value={ticket.priority.libelle.toLowerCase()}
                    exclusive
                    onChange={handlePriorityChange}
                    fullWidth
                    color="secondary"
                  >
                    <ToggleButton value="low">Low</ToggleButton>
                    <ToggleButton value="medium">Medium</ToggleButton>
                    <ToggleButton value="high">High</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
              <Box sx={{ marginTop: "20px" }}>
                <Box display="flex" justifyContent="flex-end" marginTop="10px">
                  <Tooltip title="Submit Response">
                    <IconButton
                      color="primary"
                      onClick={handleSubmitResponse}
                      sx={{ marginRight: "10px" }}
                    >
                      <Send />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Update Ticket">
                    <IconButton color="secondary" onClick={updateTicket}>
                      <Save />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Ticket Content</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{ticket?.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TicketDetails;
