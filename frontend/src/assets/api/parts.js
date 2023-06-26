import { path, path2 } from './api';

export const getParts = () => path.get('part/');
export const newPartInSucursal = (body) => path.post('sucursal-part/', body);
export const newPart = (body) => path.post('part/', body);
export const getPart = (id) => path.get(`part/${id}/`);
export const getPartsInSucursal = (id) =>
  path.get(`sucursal/${id}/sucursal-parts/`);
export const getPartsInSucursalWithinRepeat = (id) =>
  path.get(`sucursal-part/sucursal-parts/${id}/`);
export const partialUpdatePart = (id, body) => path.patch(`part/${id}/`, body);
export const getPartsByCarInSucursal = (sucursal, vehicle) =>
  path.get(`sucursal-part/sucursal-vehicle-parts/${sucursal}/${vehicle}/`);
