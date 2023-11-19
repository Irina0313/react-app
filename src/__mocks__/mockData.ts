import { IApiResp } from '../store/productsAPI';

export const mockData: IApiResp = {
  products: [
    {
      id: 20,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      discountPercentage: 2.92,
      rating: 4.92,
      stock: 54,
      brand: 'Golden',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/30/thumbnail.jpg',

      images: ['https://i.dummyjson.com/data/products/1/1.jpg'],
    },
  ],
  total: 100,
  skip: 0,
  limit: 30,
};
