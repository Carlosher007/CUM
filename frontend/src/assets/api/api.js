import axios from 'axios';
import { getTokenValue } from './tokenCookie';

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
path.interceptors.request.use(async (config) => {
  const token = await getTokenValue(); // Obtén el valor actualizado del token de las cookies

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

path2.interceptors.request.use(async (config) => {
  const token = await getTokenValue(); // Obtén el valor actualizado del token de las cookies

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

export { path, path2 };