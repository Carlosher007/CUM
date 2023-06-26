import { path, path2 } from './api';

export const createWorkOrder = (body) => path.post('work_order/', body);
export const getWorkOrdersBySucursal = (id, state) =>
  path.get(`work_order/work-orders-sucursal/${id}/${state}/`);
export const getWorkOrdersByClient = (id, state) =>
  path.get(`work_order/work-orders-client/${id}/${state}/`);
export const cancelWorkOrder = (id) =>
  path.get(`work_order/${id}/cancel-order-work`);
export const finishWorkOrder = (id) =>
  path.get(`work_order/${id}/finish-order-work`);
export const getWorkOrder = (id) => path.get(`work_order/${id}/`);
export const getStateWorkOrder = (id) =>
  path.get(`work_order/client-has-order-work/${id}/`);
