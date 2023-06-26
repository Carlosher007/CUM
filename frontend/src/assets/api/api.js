import axios from 'axios';
import { tokenValue } from './tokenCookie';

const path = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

const path2 = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Agregar el interceptor para modificar las solicitudes salientes
path.interceptors.request.use((config) => {
  const token = tokenValue; // Obtén el valor del token de las cookies

  if (token && config.method !== 'get') {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

path2.interceptors.request.use((config) => {
  const token = tokenValue; // Obtén el valor del token de las cookies

  if (token && config.method !== 'get') {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

export { path, path2 };
