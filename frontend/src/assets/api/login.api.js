import axios from 'axios';

const path = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const validateUser = (credentials) =>
  path.post('validate-user/', credentials);

export const login = (credentials) => path.post('login/', credentials);

export const sendEmail = (email) =>
  path.get('verification-code/', { params: { email } });

export const logout = (token) => path.get('logout/', { params: { token } });