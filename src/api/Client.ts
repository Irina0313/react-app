import { useState } from 'react';

function Client() {
  const apiRoot: string = 'https://swapi.dev/api';

  const [resource, setResource] = useState('planets');

  const getData = async (param: string = resource) => {
    param !== resource && setResource(param);
    const targetRoot = `${apiRoot}/${param}`;
    const resp = await fetch(targetRoot);
    const data = await resp.json();
    return data.results;
  };

  const search = async (searchRequest: string) => {
    const targetRoot = `${apiRoot}/${resource}/?search=${searchRequest}`;
    const resp = await fetch(targetRoot);
    const data = await resp.json();
    return data.results;
  };

  return { getData, search };
}

export default Client;
