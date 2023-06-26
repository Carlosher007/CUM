import axios from 'axios';
import { path } from './api';

const pathL = axios.create({
  baseURL: 'http://localhost:8000/api/',
});


export const validateUser = (credentials) =>
  pathL.post('validate-user/', credentials);

export const login = (credentials) => pathL.post('login/', credentials);

export const sendEmail = (email) =>
  pathL.get('verification-code/', { params: { email } });

export const logout = (token) => path.get('logout/', { params: { token } });