import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7108',
  });
  
  export default api;