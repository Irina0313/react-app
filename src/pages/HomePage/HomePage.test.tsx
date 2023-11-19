import {
  render,
  fireEvent,
  act,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../../store';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import HomePage from './HomePage';
import { mockData } from '../../__mocks__/mockData';
import { IApiResp } from '../../store/productsAPI';

let data: IApiResp = mockData;
let isLoading = false;
let isError = false;

const mockUpdateProducts = jest.fn();

jest.mock('../../store/productsAPI', () => ({
  ...jest.requireActual('../../store/productsAPI'),
  useGetCurrentStateParams: jest.fn(() => ({
    itemsPerPage: 30,
    searchRequest: '',
  })),
}));

jest.mock('../../store/productsAPI', () => ({
  ...jest.requireActual('../../store/productsAPI'),
  useGetProductsQuery: jest.fn(() => ({
    data: data,
    isFetching: isLoading,
    isLoading: isLoading,
    isError: isError,
  })),
}));

afterEach(() => {
  cleanup();
});
describe('Home Page tests', () => {
  function initializePage() {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </BrowserRouter>
    );
  }

  test('Check that clicking triggers an additional API call to fetch detailed information.', async () => {
    isLoading = false;

    await act(async () => {
      initializePage();
    });

    const testPageLink = screen.getAllByRole('link')[0];
    expect(testPageLink).toBeTruthy();
    fireEvent.click(testPageLink);

    waitFor(() => {
      expect(mockUpdateProducts).toHaveBeenCalled();
    });
  });

  test('Validate that clicking on a card opens a detailed card component;', async () => {
    await act(async () => {
      initializePage();
    });

    await waitFor(() => {
      const testPageLink = screen.getAllByRole('link')[0];
      expect(testPageLink).toBeTruthy();
      fireEvent.click(testPageLink);

      waitFor(() => {
        const detailedPage = screen.getByTestId('modalBackdrop');
        expect(detailedPage).toBeTruthy();
      });
    });
  });
  test('if a new value for the number of items on the page is selected, it is written as a value and displayed', async () => {
    await act(async () => {
      initializePage();
    });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 40 } });
    const displayedValue = screen.getByDisplayValue(40);

    expect(displayedValue).toBeTruthy();
  });

  test('Check that an appropriate message is displayed if no cards are present.', async () => {
    data = { products: [], total: 100, skip: 0, limit: 30 };

    await act(async () => {
      initializePage();
    });

    const notFoundPageTitle = screen.getByText('Page was not found');

    expect(notFoundPageTitle).toBeTruthy();
  });

  test('should render error message when the server request fails', async () => {
    isError = true;
    isLoading = false;

    await act(async () => {
      initializePage();
    });

    expect(screen.queryByText(/Loading.../i)).toBeFalsy();
    expect(screen.getByText(/Page was not found/i)).toBeTruthy();
  });

  test('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    await act(async () => {
      initializePage();
    });
    const notFoundPageTitle = screen.getByText('Page was not found');

    expect(notFoundPageTitle).toBeTruthy();
  });

  test('if data is loading, the "Loading..." massage is displayed', async () => {
    isLoading = true;

    await act(async () => {
      initializePage();
    });

    const loadingText = screen.getByText(/Loading.../i);

    expect(loadingText).toBeTruthy();
    isLoading = false;
  });

  /* test('Verify that clicking the Search button constructs the correct search URL', async () => {
    data = mockData;

    await act(async () => {
      initializePage();
    });

    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'mock search text' } });

    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(
      () => {
        expect(productsApi.endpoints.getProducts).toHaveBeenCalled();
      },
      { timeout: 5000 }
    );

    expect(productsApi.endpoints.getProducts).toHaveBeenCalledWith(
      expect.objectContaining({
        searchRequest: 'mock search text',
        itemsPerPage: expect.any(Number),
        currPageNumber: expect.any(Number),
      })
    );
  }); */
});
