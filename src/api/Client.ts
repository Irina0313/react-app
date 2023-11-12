import { ProductProps } from '../Components/Data/Product';

/* https://dummyjson.com/products/search?q=sam&skip=2&limit=2 */
export interface IApiResp {
  products: ProductProps[];
  total: number;
  skip: number;
  limit: number;
}

async function client(
  resource: string,
  searchRequest: string | null,
  itemsPerPage: number,
  currPageNumber: number
): Promise<IApiResp | null> {
  const apiRoot: string = 'https://dummyjson.com';

  const search = searchRequest ? `/search?q=${searchRequest}&` : '/?';
  const skip = (currPageNumber - 1) * itemsPerPage;

  const targetRoot = `${apiRoot}/${resource}${search}limit=${itemsPerPage}&skip=${skip}`;
  const resp = await fetch(targetRoot);

  if (resp.ok) {
    const data = await resp.json();
    return data;
  } else {
    throw new Error(`Failed to fetch data. Status: ${resp.status}`);
  }
}

export default client;
