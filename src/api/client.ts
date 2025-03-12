import { create } from 'apisauce'

const API_URL = process.env.REACT_APP_API_URL;


const apiClient = create({
   baseURL: API_URL,
   timeout: 30000,
   
})

export default apiClient