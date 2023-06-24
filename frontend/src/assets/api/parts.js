import axios from 'axios';

const path = axios.create({
  baseURL: 'http://localhost:8000/api/',
});



export const getParts = () => path.get('part/');
export const newPartInSucursal = (body) => path.post('sucursal-part/')
export const newPart = (body) => path.post('part/');
export const getPart = (id) => path.get(`part/${id}/`)
export const getPartsInSucursal = (id) => path.get(`sucursal/${id}/sucursal-parts/`)