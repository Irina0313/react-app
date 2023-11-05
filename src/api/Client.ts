import { ProductProps } from '../Components/Data/Product';

/* https://dummyjson.com/products/search?q=sam&skip=2&limit=2 */
export interface IApiResp {
  products: ProductProps[];
  total: number;
  skip: number;
  limit: number;
}

async function client(
  resource: string = 'products',
  searchRequest: string | null = null,
  itemsPerPage: number = 30,
  currPageNumber: number
): Promise<IApiResp> {
  const apiRoot: string = 'https://dummyjson.com';

  const getData = async () => {
    const search = searchRequest ? `/search?q=${searchRequest}&` : '/?';
    const skip = (currPageNumber - 1) * itemsPerPage;
    const targetRoot = `${apiRoot}/${resource}${search}limit=${itemsPerPage}&skip=${skip}`;

    const resp = await fetch(targetRoot);
    const data = await resp.json();

    return data;
  };

  return await getData();
}

export default client;
