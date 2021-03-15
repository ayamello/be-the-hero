import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333' //parte da url que vai ser mantida entre todas as chamadas
})

export default api;