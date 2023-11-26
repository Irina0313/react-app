import { mockData } from './mockData';
import { mockProduct } from './mockProduct';

export const getProducts = async () => {
  return mockData;
};

export const getProductById = async (productId: number) => {
  if (productId === mockProduct.id) {
    return mockProduct;
  } else {
    throw new Error('Product not found');
  }
};
