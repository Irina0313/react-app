import client, { IApiResp } from './Client';

describe('client function', () => {
  it('should construct the correct search string with searchRequest', async () => {
    const searchRequest = 'sam';
    const itemsPerPage = 30;
    const currPageNumber = 1;

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        products: [],
        total: 0,
        skip: 0,
        limit: 0,
      } as IApiResp),
    });

    await client('products', searchRequest, itemsPerPage, currPageNumber);

    expect(fetch).toHaveBeenCalledWith(
      'https://dummyjson.com/products/search?q=sam&limit=30&skip=0'
    );
  });

  it('should construct the correct search string without searchRequest', async () => {
    const searchRequest = null;
    const itemsPerPage = 30;
    const currPageNumber = 1;

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        products: [],
        total: 0,
        skip: 0,
        limit: 0,
      } as IApiResp),
    });

    await client('products', searchRequest, itemsPerPage, currPageNumber);

    expect(fetch).toHaveBeenCalledWith(
      'https://dummyjson.com/products/?limit=30&skip=0'
    );
  });

  it('should construct the correct search string without searchRequest', async () => {
    const searchRequest = null;
    const itemsPerPage = 30;
    const currPageNumber = 1;

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    async function testClient() {
      await client('products', searchRequest, itemsPerPage, currPageNumber);
    }
    await expect(testClient).rejects.toThrow(
      'Failed to fetch data. Status: 404'
    );
  });
});
