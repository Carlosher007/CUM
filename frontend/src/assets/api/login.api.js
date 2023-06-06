import axios from 'axios';

const loginApi = axios.create({
  baseURL: 'http://localhost:8000/api/', 
});

export const loginUser = (credentials) => loginApi.post('login/', credentials);
export const verificationEmail = (credentials) => loginApi.post('verification-email/', credentials);