import axios from 'axios';

const loginApi = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const getCars = () => loginApi.get('vehiculo/');

export const getCar = (modelo) => loginApi.get(`vehiculo/${modelo}`);

