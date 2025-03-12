import { Ticket } from "../pages/TicketDetails";
import apiClient from "./client";
const endpoint = '/shareskillsapi/v1/tickets'


const getTickets = () => apiClient.get(endpoint)

const getFilteredTickets = (status: string) => apiClient.get(`${endpoint}?status=${status}`)


const getTicketDetail = (id: number) => apiClient.get(`${endpoint}/${id}`)

const updateTicket = (ticket: Ticket) => apiClient.put(`${endpoint}/${ticket.id}`, {
    subject: ticket.subject,
    body: ticket.content,
    priority: ticket.priority,
    status: ticket.status
})


export default {
    getTickets,
    getTicketDetail,
    updateTicket,
    getFilteredTickets
}