class Client {
  apiRoot: string = 'https://swapi.dev/api';
  resource: string;

  constructor(resource: string = 'planets') {
    this.resource = resource;
  }

  getData = async (param: string = 'planets') => {
    this.resource = param;
    const targetRoot = `${this.apiRoot}/${param}`;
    const resp = await fetch(targetRoot);
    const data = await resp.json();
    console.log(data.results);
    return data.results;
  };
  search = async (searchRequest: string) => {
    const targetRoot = `${this.apiRoot}/${this.resource}/?search=${searchRequest}`;
    const resp = await fetch(targetRoot);
    const data = await resp.json();
    return data.results;
  };
}

export default Client;
