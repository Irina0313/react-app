import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { waitFor } from '@testing-library/react';
import { IApiResp, IGetProducts, ProductProps } from '../lib/productsApi';

const customFetchBaseQuery: BaseQueryFn = async (args) => {
  const response = await fetch(args.input, args.init);
  const data = await response.json();

  const result: QueryReturnValue<IApiResp, unknown, object> = {
    data,
    error: null,
    meta: {
      requestId: 'mockRequestId',
    },
  };

  return result;
};

const api = createApi({
  baseQuery: customFetchBaseQuery,
  endpoints: (build) => ({
    getProducts: build.query<IApiResp, IGetProducts>({
      query: (args) => {
        const search = args.searchRequest
          ? `/search?q=${args.searchRequest}&`
          : '/?';
        const skip = (args.currPageNumber - 1) * args.itemsPerPage;
        const targetRoot = `products${search}limit=${args.itemsPerPage}&skip=${skip}`;

        return targetRoot;
      },
    }),
    getProductById: build.query<ProductProps, { productId: number }>({
      query: ({ productId }) => `products/${productId}`,
    }),
  }),
});

describe('productsApi - Query Functions', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('getProducts - constructs the correct query for search', async () => {
    const result = await api.endpoints.getProducts.initiate({
      searchRequest: 'sample',
      itemsPerPage: 10,
      currPageNumber: 1,
    });
    console.log(result);
    waitFor(() => {
      expect(result).toEqual(
        expect.stringContaining('products/search?q=sample&limit=10&skip=0')
      );
    });
  });
});
