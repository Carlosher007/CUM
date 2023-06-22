import axios from 'axios';

const path = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const createQuote = (body) => path.post('quotation/', body);
export const getQuotes = () => path.get('quotation');
export const getQuotesByClient = (client,state) => path.get(`assigned-quote/assigned-quotes-client/${client}/${state}/`)
export const getQuotesBySeller = (seller, state) =>
  path.get(`assigned-quote/assigned-quotes-seller/${seller}/${state}/`);
