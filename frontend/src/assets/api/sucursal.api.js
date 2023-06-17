import axios from 'axios';

const path = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const getSucursals = () => path.get('sucursal/');
export const getSucursalsStaff = () =>
  path.get('sucursal/sucursals-staff/');
export const getSucursal = (id) => path.get(`sucursal/${id}`);
export const updateSucursal = (id, body) =>
  path.put(`sucursal/${id}/`, body);
export const newSucursal = (body) => path.post('sucursal/', body);
export const getCarsBySucursal = (id) =>
  path.get(`sucursal/${id}/sucursal-vehicles`);
export const getCarsColorBySucursal = (id) =>
  path.get(`sucursal/${id}/sucursal-vehicles-color`);
export const getUsersBySucursal = (id) =>
  path.get(`sucursal/${id}/sucursal-users`);
// export const newSucursalCar
