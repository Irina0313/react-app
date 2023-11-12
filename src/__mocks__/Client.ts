import { IApiResp } from '../api/Client';
import { mockContext } from './mockContext';
import { isMockServerError, isMockServerNoDataResponse } from '../App.test';

type MockClientReturnType = IApiResp | IErrorResp | null;

interface IErrorResp {
  products: [];
}

const errorResp: IErrorResp = {
  products: [],
};

const mockClient: jest.Mock<Promise<MockClientReturnType>, []> = jest.fn(() => {
  if (isMockServerNoDataResponse) {
    return Promise.resolve(errorResp);
  }
  if (isMockServerError) {
    throw new Error('Mock Server Error');
  }

  return Promise.resolve(mockContext);
});
export default mockClient;
