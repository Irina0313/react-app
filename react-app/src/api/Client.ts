class Client {
  private apiRoot: string = 'https://swapi.dev/api';
  getData = async (param: string) => {
    const targetRoot = `${this.apiRoot}/${param}`;
    const resp = await fetch(targetRoot);
    const data = await resp.json();
    console.log(data);
  };
}

export default Client;
