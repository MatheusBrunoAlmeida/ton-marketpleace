import axios from 'axios';

const api = axios.create({
  baseURL: 'https://606cf12d603ded0017502d15.mockapi.io/api',
});

export default api;
