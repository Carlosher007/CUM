import axios from 'axios';

const loginApi = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const validateUser = (credentials) =>
  loginApi.post('validate-user/', credentials);

export const login = (credentials) => loginApi.post('login/', credentials);

export const sendEmail = (email) =>
  loginApi.get('verification-code/', { params: { email } });

export const logout = (token) => loginApi.get('logout/', { params: { token } });