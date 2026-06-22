import axios from 'axios';

const API_BASE_URL = `http://${window.location.hostname}:8000`;

const api = axios.create({
  baseURL: API_BASE_URL
});

export { API_BASE_URL };
export default api;
