import axios from 'axios';
import { getTokenValue } from './tokenCookie';

// https://cum-api-rest.onrender.com/api/
// https://cum-api-rest.onrender.com/api/

const path = axios.create({
  baseURL: 'https://cum-api-rest.onrender.com/api/',
});

const path2 = axios.create({
  baseURL: 'https://cum-api-rest.onrender.com/api/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const path3 = axios.create({
  baseURL: 'https://cum-api-rest.onrender.com/api/',
});

// Agregar el interceptor para modificar las solicitudes salientes
path.interceptors.request.use(async (config) => {
  const token = await getTokenValue(); // Obtén el valor actualizado del token de las cookies

  if (token && token !== undefined) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

path2.interceptors.request.use(async (config) => {
  const token = await getTokenValue(); // Obtén el valor actualizado del token de las cookies

  if (token && token !== undefined) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

export { path, path2, path3 };
