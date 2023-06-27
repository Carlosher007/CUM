import axios from 'axios';
import { path , path3} from './api';

export const validateUser = (credentials) =>
  path3.post('validate-user/', credentials);

export const login = (credentials) => path3.post('login/', credentials);

export const sendEmail = (email) =>
  path3.get('verification-code/', { params: { email } });

export const logout = (token) => path.get('logout/', { params: { token } });