import axios from 'axios';

const loginApi = axios.create({
  baseURL: 'http://localhost:8000/api/', // Ajusta la URL base según la configuración de tu backend de Django
});

export const getCars = () => loginApi.get('vehiculo/');

export const getCar = (modelo) => loginApi.get(`vehiculo/${modelo}`);

