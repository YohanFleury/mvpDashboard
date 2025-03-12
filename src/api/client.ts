import { create } from 'apisauce'


const apiClient = create({
   baseURL: 'https://apitest.sharingzon.com/',
   timeout: 30000,
   
})

export default apiClient