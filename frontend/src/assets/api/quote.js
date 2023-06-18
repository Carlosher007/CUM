import axios from 'axios';

const path = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const createQuote = (body) => path.post('quotation/',body) ; 