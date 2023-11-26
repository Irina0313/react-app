import { ProductProps, IApiResp } from '@/lib/productsApi';
import { IGetProducts } from './../lib/productsApi';
import { productsApi } from './../lib/productsApi';

export const mockFetchData = async (
  args: IGetProducts
): Promise<IApiResp | undefined> => {
  try {
    console.log(productsApi.endpoints.getProducts.useQuery(args));
    const result = productsApi.endpoints.getProducts.useQuery(args).data;

    if (result) {
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export const mockFetchProductById = async (
  productId: number
): Promise<ProductProps | undefined> => {
  try {
    const result = productsApi.endpoints.getProductById.useQuery({
      productId,
    }).data;

    if (result) {
      return result;
    }
  } catch (error) {
    throw error;
  }
};
