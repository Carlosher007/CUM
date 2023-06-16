import axios from 'axios';

const loginApi = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const getSucursals = () => loginApi.get('sucursal/');
export const getSucursalsStaff = () =>
  loginApi.get('sucursal/sucursals-staff/');
export const getSucursal = (id) => loginApi.get(`sucursal/${id}`);
export const updateSucursal = (id, body) =>
  loginApi.put(`sucursal/${id}/`, body);
export const newSucursal = (body) => loginApi.post('sucursal/', body);
export const getCarsBySucursal = (id) =>
  loginApi.get(`sucursal/${id}/sucursal-vehicles`);
export const getCarsColorBySucursal = (id) =>
    loginApi.get(`sucursal/${id}/sucursal-vehicles-color`);
export const getUsersBySucursal = (id) =>
  loginApi.get(`sucursal/${id}/sucursal-users`);
// export const newSucursalCar