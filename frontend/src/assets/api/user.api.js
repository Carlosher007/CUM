import { path, path2 } from './api';

export const getUsers = () => path.get('user/');

export const getUser = (id) => path.get(`user/${id}`);

export const deleteUser = (id) => path.delete(`user/${id}`);

export const updateMyProfile = (id, body) => path.patch(`user/${id}/`, body);

export const newUser = (body) => path.post(`user/`, body);
