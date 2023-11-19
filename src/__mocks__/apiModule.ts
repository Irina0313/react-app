import { productsApi, IApiResp, IGetProducts } from '../store/productsAPI';
import { ProductProps } from '../Components/Data/Product';

export const mockFetchData = async (
  args: IGetProducts
): Promise<IApiResp | undefined> => {
  try {
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
