import axios from 'axios';

const loginApi = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const getUsers = () => loginApi.get('user/');

export const getUser = (id) => loginApi.get(`user/${id}`);

export const deleteUser = (id) => loginApi.delete(`user/${id}`);

export const updateMyProfile = (id, body) =>
  loginApi.patch(`user/${id}/`, body);

export const newUser = (body) => loginApi.post(`user/`, body);
