import axios from 'axios';

const path = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

const path2 = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const getCars = () => path.get('vehicle/');
export const getCar = (id) => path.get(`vehicle/${id}`);
export const newCar = (body) => path2.post('vehicle/', body);
export const newCarInSucursal = (body) => path2.post('vehicle-sucursal/', body);
export const updateCar = (body, id) => path2.patch(`vehicle/${id}/`, body);
export const getColorsCar = (id, vehicle) =>
  path.get(`sucursal/${id}/${vehicle}/vehicle-colors/`);
export const getCarByColor = (id, vehicle, color) =>
  path.get(`sucursal/${id}/${vehicle}/${color}/vehicle-sucursal-id/`);
export const getCarsSoldBySucursal = (id) =>
  path.get(`sucursal/sold-vehicles-sucursal/${id}`);
export const getCarsSoldByClient = (id) =>
  path.get(`sucursal/sold-vehicles-client/${id}/`);
