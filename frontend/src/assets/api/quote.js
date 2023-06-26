import { path, path2 } from './api';

export const createQuote = (body) => path.post('quotation/', body);
export const getQuotes = () => path.get('quotation');
export const getQuotesByClient = (client, state) =>
  path.get(`assigned-quote/assigned-quotes-client/${client}/${state}/`);
export const getQuotesBySeller = (seller, state) =>
  path.get(`assigned-quote/assigned-quotes-seller/${seller}/${state}/`);
export const getQuotesBySucursal = (idSucursal, state) =>
  path.get(`assigned-quote/assigned-quotes-sucursal/${idSucursal}/${state}/`);
export const getQuote = (id) => path.get(`assigned-quote/${id}/`);
export const cancelQuote = (id) =>
  path.get(`assigned-quote/${id}/cancel-assigned-quote`);
export const acceptQuote = (id) =>
  path.get(`assigned-quote/${id}/accept-assigned-quote`);
export const finishQuote = (id) =>
  path.get(`assigned-quote/${id}/finish-assigned-quote`);
