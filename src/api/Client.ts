import { useState } from 'react';

function Client() {
  const apiRoot: string = 'https://swapi.dev/api';

  const [resource, setResource] = useState('planets');

  return {
    getData: async (param: string = resource) => {
      param !== resource && setResource(param);
      const targetRoot = `${apiRoot}/${param}`;
      const resp = await fetch(targetRoot);
      const data = await resp.json();
      console.log('getData', data);
      return data.results;
    },

    search: async (searchRequest: string) => {
      const targetRoot = `${apiRoot}/${resource}/?search=${searchRequest}`;
      const resp = await fetch(targetRoot);
      const data = await resp.json();
      console.log('search', data);
      return data.results;
    },
  };
}

export default Client;
