import axios from 'axios';

const loginApi = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const getUsers = () => loginApi.get('user/');

export const getUser = (id) => loginApi.get(`user/${id}`);


