import apiClient from "./client";

const endpoint = '/shareskillsapi/v1/users'

const getUserById = (id: number) => apiClient.get(`${endpoint}/${id}`)

const getUserByUsername = (username: string) => apiClient.get(`${endpoint}/search/${username}`)

const getUserByEmail = (email: string) => apiClient.get(`${endpoint}/byemail?email=${email}`)

const getUserTransactions = (id: number) => apiClient.get(`${endpoint}/${id}/transactions`)

const getCreatorNumberSub = (id: number) => apiClient.get(`/shareskillsapi/v1/connections/countabo/${id}`)

const getSubscriptions = (id: number) => apiClient.get(`${endpoint}/${id}/subscriptions`)

const getCreatorPosts = (id: number) => apiClient.get(`/shareskillsapi/v1/publications/users/${id}`)

const getPublicationsCount = (id: number) => apiClient.get(`/shareskillsapi/v1/publications/countpub/${id}`)


export default {
    getUserById,
    getUserByEmail,
    getUserByUsername,
    getUserTransactions,
    getCreatorNumberSub,
    getSubscriptions,
    getCreatorPosts,
    getPublicationsCount
}