import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const tokenValue = cookies.get('token');
