import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
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

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const fetchedTicket = {
        id: id,
        email: "user1@example.com",
        subject: "Login Issue",
        content:
          "I cannot log in to my account. " + "More content... ".repeat(20),
        status: "new",
        priority: "high",
        created_at: "2024-07-01T10:00:00Z",
      };
      setTicket(fetchedTicket);
      setStatus(fetchedTicket.status);
      setPriority(fetchedTicket.priority);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleStatusChange = (event: any, newStatus: string) => {
    if (newStatus !== null) {
      setStatus(newStatus);
    }
  };

  const handlePriorityChange = (event: any, newPriority: string) => {
    if (newPriority !== null) {
      setPriority(newPriority);
    }
  };

  const handleResponseChange = (event: any) => {
    setResponse(event.target.value);
  };

  const handleSubmitResponse = () => {
    console.log("Response:", response);
  };

  const handleUpdateTicket = () => {
    console.log("Status:", status);
    console.log("Priority:", priority);
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
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: "20px", borderRadius: "12px" }}>
              <Box display="flex" alignItems="center" marginBottom="20px">
                <Avatar sx={{ marginRight: "10px", bgcolor: "#1976d2" }}>
                  {ticket.email.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h4">Ticket Details</Typography>
              </Box>
              <Grid container spacing={2}>
                {[
                  { label: "Ticket ID", value: ticket.id },
                  { label: "Email", value: ticket.email },
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
                    value={status}
                    exclusive
                    onChange={handleStatusChange}
                    fullWidth
                    color="primary"
                  >
                    <ToggleButton value="new">New</ToggleButton>
                    <ToggleButton value="open">Open</ToggleButton>
                    <ToggleButton value="pending">Pending</ToggleButton>
                    <ToggleButton value="resolved">Resolved</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Priority</Typography>
                  <ToggleButtonGroup
                    value={priority}
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
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="Response"
                  variant="outlined"
                  value={response}
                  onChange={handleResponseChange}
                />
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
                    <IconButton color="secondary" onClick={handleUpdateTicket}>
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
