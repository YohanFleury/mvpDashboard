import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
} from "@mui/material";
import useApi from "../hooks/useApi";
import users from "../api/users";

interface SubscriptionsInfosProps {
  id: any;
  subscriptions: any[];
}

const SubscriptionsInfos = ({ id, subscriptions }: SubscriptionsInfosProps) => {
  const [transactions, setTransactions] = useState<any[]>([]);

  const getTransactionsApi = useApi(users.getUserTransactions);

  useEffect(() => {
    getTransactionsApi.request(id);
  }, []);

  useEffect(() => {
    if (getTransactionsApi.success) {
      console.log("Transactions : ", getTransactionsApi.data);
      const orderedTransaction = getTransactionsApi.data.reverse();
      setTransactions(orderedTransaction);
    } else if (getTransactionsApi.error) {
      console.log(
        "Erreur transactions : ",
        getTransactionsApi.status,
        getTransactionsApi.problem
      );
    }
  }, [getTransactionsApi.success, getTransactionsApi.error]);

  // Données factices pour les abonnements

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#4caf50"; // Vert
      case "expired":
        return "#f44336"; // Rouge
      case "canceled":
        return "#ff9800"; // Orange
      default:
        return "#000";
    }
  };

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      <Typography variant="h5" gutterBottom>
        Subscriptions
      </Typography>
      {
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: "20px", borderRadius: "12px" }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Creator</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Start Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subscriptions.map((subscription, index) => (
                      <TableRow key={index}>
                        <TableCell>{subscription.username}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                backgroundColor: getStatusColor(
                                  subscription.status
                                ),
                                marginRight: 1,
                              }}
                            />
                            {subscription.status}
                          </Box>
                        </TableCell>
                        <TableCell>
                          {new Date(
                            subscription.startDate
                          ).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Transactions
            </Typography>
            <Paper elevation={3} sx={{ padding: "20px", borderRadius: "12px" }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Transaction ID</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Creator ID</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Currency</TableCell>
                      <TableCell>Purchase Date</TableCell>
                      <TableCell>Platform</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((transaction: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>123456</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>{transaction.creatorId}</TableCell>
                        <TableCell>
                          {transaction.priceInPurchasedCurrency}
                        </TableCell>
                        <TableCell>{transaction.currency}</TableCell>
                        <TableCell>
                          {new Date(
                            transaction.transactionDate
                          ).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{transaction.plateform}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      }
    </Box>
  );
};

export default SubscriptionsInfos;
