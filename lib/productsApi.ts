import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IApiResp {
  products: ProductProps[];
  total: number;
  skip: number;
  limit: number;
}

export interface IGetProducts {
  searchRequest: string | null;
  itemsPerPage: number;
  currPageNumber: number;
}

/* https://dummyjson.com/products/search?q=sam&skip=2&limit=2 */

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  util: { getRunningQueriesThunk },
} = productsApi;

export const { getProducts, getProductById } = productsApi.endpoints;
