import axios from 'axios';

const path = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const getCars = () => path.get('vehicle/');
export const getCar = (id) => path.get(`vehicle/${id}`);
export const newCar = (body) => path.post('vehicle/', body);
export const newCarInSucursal = (body) => path.post('vehicle-sucursal/', body);
export const updateCar = (body, id) => path.patch(`vehicle/${id}/`, body);
export const getColorsCar = (id, vehicle) =>
  path.get(`sucursal/${id}/${vehicle}/vehicle-colors/`);
export const getCarByColor = (id, vehicle, color) =>
  path.get(`sucursal/${id}/${vehicle}/${color}/vehicle-sucursal-id/`);