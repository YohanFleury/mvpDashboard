import apiClient from "./client";
const endpoint = '/shareskillsapi/v1/payments'

const getPayments = () => apiClient.get(`${endpoint}/plateforms`)

const createPayment = (plateform: string, amount: number, moisAnnee: string, paiementDateTime: string) => apiClient.post(`${endpoint}/plateform`, {
    plateform,
    amount,
    moisAnnee,
    paiementDateTime
})

const consoliderPaiement = (id: number) => apiClient.put(`${endpoint}/consolidation/${id}`)


export default {
    getPayments,
    createPayment,
    consoliderPaiement
}