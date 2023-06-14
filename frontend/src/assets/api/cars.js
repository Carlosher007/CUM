import axios from 'axios';

const loginApi = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const getCars = () => loginApi.get('vehicle/');
export const getCar = (id) => loginApi.get(`vehicle/${id}`);
export const newCar = (body) => loginApi.post('vehicle/',body)