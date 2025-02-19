import apiClient from "./client";

const endpoint ='/shareskillsapi/auth'

const connectUser = (email: string, password: string) =>
    apiClient.post(`${endpoint}/access`, {
        username: 'aa',
        email: email,
        pwd: password
    })

const generateCode = (name: string) => apiClient.get(`${endpoint}/register/code?name=${name}`)

export default {
    connectUser,
    generateCode
}