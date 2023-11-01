import { useState } from 'react';

function Client() {
  const apiRoot: string = 'https://dummyjson.com/';

  const [resource, setResource] = useState('products');

  return {
    getData: async (param: string = resource) => {
      param !== resource && setResource(param);
      const targetRoot = `${apiRoot}${param}`;
      const resp = await fetch(targetRoot);
      const data = await resp.json();
      console.log('getData', data);
      return data.products;
    },

    search: async (searchRequest: string) => {
      const targetRoot = `${apiRoot}${resource}/search?q=${searchRequest}`;
      const resp = await fetch(targetRoot);
      const data = await resp.json();
      console.log('search', data);
      return data.products;
    },
  };
}

export default Client;
