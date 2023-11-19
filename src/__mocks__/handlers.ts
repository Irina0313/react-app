import { http, HttpResponse } from 'msw';
import { mockData } from './mockData';
import { mockProduct } from './mockProduct';

/* const products = 'https://dummyjson.com/products/'; */

export const handlers = [
  http.get('https://dummyjson.com/products/', () => {
    console.log('https://dummyjson.com/products/');

    return HttpResponse.json(mockData);
  }),
  http.get('https://dummyjson.com/products/20', () => {
    console.log('https://dummyjson.com/products/20');
    return HttpResponse.json(mockProduct);
  }),
];
