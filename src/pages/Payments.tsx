import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import AddIcon from "@mui/icons-material/Add";
import payments from "../api/payments";
import useApi from "../hooks/useApi";

// Définition du type Payment
type Payment = {
  amount: number;
  expectedAmount: number;
  moisAnnee: string;
  paiementDateTime: string; // ISO string
  plateform: string;
  state: "NOT_DONE" | "DONE";
};

const Payments: React.FC = () => {
  const getPlatformsPaymentsApi = useApi(payments.getPayments);

  useEffect(() => {
    getPlatformsPaymentsApi.request();
  }, []);

  useEffect(() => {
    if (getPlatformsPaymentsApi.success) {
      console.log("Liste des paiements: ", getPlatformsPaymentsApi.data);
    } else if (getPlatformsPaymentsApi.error) {
      console.log(
        "Erreur get liste payements plateforme : ",
        getPlatformsPaymentsApi.status,
        getPlatformsPaymentsApi.problem
      );
    }
  }, [getPlatformsPaymentsApi.success, getPlatformsPaymentsApi.error]);

  // Exemple de données de paiement
  const [paymentsArray, setPaymentsArray] = useState<Payment[]>([
    {
      amount: 29.99,
      expectedAmount: 32.2,
      moisAnnee: "2024-11",
      paiementDateTime: "2025-02-15T10:00:00",
      plateform: "APP_STORE",
      state: "NOT_DONE",
    },
    {
      amount: 45.0,
      expectedAmount: 45.0,
      moisAnnee: "2025-01",
      paiementDateTime: "2025-01-20T15:30:00",
      plateform: "APP_STORE",
      state: "DONE",
    },
    // ... d'autres paiements
  ]);

  // Fonction appelée lors du clic sur "Consolider"
  const consolidatePaiement = (payment: Payment) => {
    console.log("Consolider paiement :", payment);
    // TODO : Appeler votre API de consolidation ici
  };

  // Affichage conditionnel du formulaire de création
  const [showCreateForm, setShowCreateForm] = useState(false);

  // État pour le formulaire de création de paiement (sans le champ date)
  const [newPayment, setNewPayment] = useState({
    plateform: "APP_STORE",
    amount: "",
    moisAnnee: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPayment({ ...newPayment, [e.target.name]: e.target.value });
  };

  const handleCreatePayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const paymentBody = {
      plateform: newPayment.plateform,
      amount: parseFloat(newPayment.amount),
      moisAnnee: newPayment.moisAnnee,
      paiementDateTime: new Date().toISOString(), // Date actuelle
    };
    console.log("Création du paiement :", paymentBody);
    // TODO : Appeler votre API de création de paiement ici

    // Réinitialiser le formulaire et masquer le formulaire
    setNewPayment({ plateform: "APP_STORE", amount: "", moisAnnee: "" });
    setShowCreateForm(false);
  };

  // Tri des paiements du plus récent au moins récent en se basant sur paiementDateTime
  const sortedPayments = [...paymentsArray].sort(
    (a, b) =>
      new Date(b.paiementDateTime).getTime() -
      new Date(a.paiementDateTime).getTime()
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Paiements
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date de Paiement</TableCell>
                <TableCell>Mois/Année</TableCell>
                <TableCell>Plateforme</TableCell>
                <TableCell>Montant</TableCell>
                <TableCell>Montant Attendu</TableCell>
                <TableCell>État</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedPayments.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(payment.paiementDateTime).toLocaleString()}
                  </TableCell>
                  <TableCell>{payment.moisAnnee}</TableCell>
                  <TableCell>{payment.plateform}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.expectedAmount}</TableCell>
                  <TableCell>{payment.state}</TableCell>
                  <TableCell>
                    {payment.state === "NOT_DONE" && (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PaymentIcon />}
                        onClick={() => consolidatePaiement(payment)}
                      >
                        Consolider
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          Créer un paiement
        </Button>
      </Paper>

      {showCreateForm && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Créer un nouveau paiement
          </Typography>
          <Box
            component="form"
            onSubmit={handleCreatePayment}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              select
              name="plateform"
              label="Plateforme"
              value={newPayment.plateform}
              onChange={handleFormChange}
              fullWidth
            >
              <MenuItem value="APP_STORE">APP_STORE</MenuItem>
              <MenuItem value="ANDROID">ANDROID</MenuItem>
            </TextField>
            <TextField
              name="amount"
              label="Montant"
              type="number"
              value={newPayment.amount}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              name="moisAnnee"
              label="Mois/Année"
              placeholder="YYYY-MM"
              value={newPayment.moisAnnee}
              onChange={handleFormChange}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Créer Paiement
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Payments;
