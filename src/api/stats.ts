import apiClient from "./client";
const endpoint = '/shareskillsapi/v1/stats'

const getGlobalStats = () => apiClient.get(`${endpoint}/global`)

const getSubscriptionsStats = () => apiClient.get(`${endpoint}/global/abonnements`)

const getExclusifContentStats = () => apiClient.get(`${endpoint}/global/contentEx`)

const getRevenueStats = () => apiClient.get(`${endpoint}/global/revenus`)


export default {
    getGlobalStats,
    getSubscriptionsStats,
    getExclusifContentStats,
    getRevenueStats
}