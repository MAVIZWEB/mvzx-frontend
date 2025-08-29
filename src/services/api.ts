 import axios from 'axios';
const API = axios.create({ baseURL: process.env.REACT_APP_API || 'https://maviz-kefi.onrender.com/api' });
export default API;
