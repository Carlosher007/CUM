import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getTokenValue = () => cookies.get('token');

export const getRolValue = () => cookies.get('rol');

