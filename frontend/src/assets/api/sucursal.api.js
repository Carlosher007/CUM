import axios from 'axios';

const loginApi = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const getSucursals = () => loginApi.get('sucursal/')
export const getSucursalsStaff = () => loginApi.get('sucursal/sucursals-staff/');
export const getSucursal = (id) => loginApi.get(`sucursal/${id}`)
