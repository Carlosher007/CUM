import axios from 'axios';

const path = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const createWorkOrder = (body) => path.post('work_order/',body)
