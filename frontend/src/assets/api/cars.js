import axios from 'axios';
import { path, path2, path3 } from './api';



export const getCars = () => path.get('vehicle/');
export const getCar = (id) => path.get(`vehicle/${id}`);
export const newCar = (body) => path2.post('vehicle/', body);
export const newCarInSucursal = (body) => path2.post('vehicle-sucursal/', body);
export const newCarInSucursal2 = (body) => path.post('vehicle-sucursal/', body);
export const updateCar = (body, id) => path2.patch(`vehicle/${id}/`, body);
export const getColorsCar = (id, vehicle) =>
  path.get(`sucursal/${id}/${vehicle}/vehicle-colors/`);
export const getCarByColor = (id, vehicle, color) =>
  path.get(`sucursal/${id}/${vehicle}/${color}/vehicle-sucursal-id/`);
export const getCarsSoldBySucursal = (id) =>
  path3.get(`sucursal/sold-vehicles-sucursal/${id}`);
export const getCarsSoldByClient = (id) =>
  path.get(`sucursal/sold-vehicles-client/${id}/`);
