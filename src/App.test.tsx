import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SearchContext, LoadingContext, ProductsContext } from './context';
import { mockContext } from './__mocks__/mockContext';
import { mockSetItem } from './__mocks__/mockLocalStorage';
import '@testing-library/jest-dom';

export let isMockServerError = false;
export let isMockServerNoDataResponse = false;

jest.mock('./api/Client', () => require('./__mocks__/Client'));

describe('App tests', () => {
  beforeEach(() => {
    mockSetItem.mockClear();
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  const loading = false;
  let mockSearchParams = 'mySearch';
  const mockUpdateProducts = jest.fn();

  function initializePage() {
    jest.clearAllMocks();
    render(
      <BrowserRouter>
        <LoadingContext.Provider value={loading}>
          <SearchContext.Provider
            value={{ onSearch: () => {}, prevSearchParams: mockSearchParams }}
          >
            <ProductsContext.Provider value={mockContext}>
              <App />
            </ProductsContext.Provider>
          </SearchContext.Provider>
        </LoadingContext.Provider>
      </BrowserRouter>
    );
  }

  test('it should display right page numder and items per page when users use pagination', async () => {
    isMockServerError = false;
    mockSearchParams = '';
    await act(async () => {
      initializePage();
    });
    await waitFor(() => {
      const nextBtn = screen.getByText(/next/i);
      const prevBtn = screen.getByText(/prev/i);
      const itemsPerPage = screen.getByRole('combobox');

      expect(itemsPerPage).toBeTruthy();
      fireEvent.select(itemsPerPage, { value: '10' });
      waitFor(() => {
        expect(screen.getByDisplayValue('10')).toBeTruthy();
      });
      expect(prevBtn).toBeDisabled();
      expect(prevBtn).toBeTruthy();
      fireEvent.click(prevBtn);
      expect(screen.getByTestId('currPageNumber')).toHaveTextContent('1');
      expect(nextBtn).toBeTruthy();
      fireEvent.click(nextBtn);
      expect(screen.getByTestId('currPageNumber')).toHaveTextContent('2');
      fireEvent.select(itemsPerPage, { value: '10' });
    });
  });
  test('Check that clicking triggers an additional API call to fetch detailed information.', async () => {
    await act(async () => {
      initializePage();
    });
    await waitFor(() => {
      const testPageLink = screen.getAllByRole('link')[0];
      expect(testPageLink).toBeTruthy();
      fireEvent.click(testPageLink);
      waitFor(() => {
        expect(mockUpdateProducts).toHaveBeenCalled();
      });
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
  test('renders the app with BrowserRouter', async () => {
    await act(async () => {
      initializePage();
    });

    expect(screen.getByText(/RSS React App Catalog/i)).toBeTruthy();
  });

  test('App snapshot', async () => {
    const app = await act(async () => {
      initializePage();
    });

    expect(app).toMatchSnapshot();
  });

  test('it should render correctly when the server return no data', async () => {
    isMockServerNoDataResponse = true;

    await act(async () => {
      initializePage();
    });

    await act(async () => {
      expect(screen.getByText(/Page was not found/i)).toBeTruthy();
      isMockServerError = false;
    });
  });

  test('should render error message when the server request fails', async () => {
    isMockServerError = true;

    await act(async () => {
      initializePage();
    });

    expect(screen.queryByText(/Loading.../i)).toBeFalsy();
    expect(screen.getByText(/Page was not found/i)).toBeTruthy();

    isMockServerError = false;
  });

  test('Verify that clicking the Search button saves the entered value to the local storage and Check that the component retrieves the value from the local storage upon mounting.', async () => {
    await act(async () => {
      initializePage();
    });

    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'mock search text  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    /*save search to the locale storage*/
    await waitFor(() => {
      const displayedSearchValue = screen.getByDisplayValue('mock search text');
      expect(displayedSearchValue).toBeTruthy();
      expect(mockSetItem).toHaveBeenCalledTimes(1);
      expect(mockSetItem).toHaveBeenCalledWith(
        'savedSearch',
        JSON.stringify('mock search text')
      );
    });

    /*initiate page reload*/
    await act(async () => {
      initializePage();
    });

    /*check that the Search input value component retrieves the value from the local storage upon mounting*/
    const displayedSearchValue = screen.getByDisplayValue('mock search text');
    expect(displayedSearchValue).toBeTruthy();
  });

  test('should handle test error', async () => {
    await act(async () => {
      initializePage();
    });

    await act(async () => {
      const testErrorBtn = screen.getByRole('button', { name: 'Test error' });
      fireEvent.click(testErrorBtn);
    });

    await screen.findByText(/Page was not found/i);

    const errorDisplayed = screen.getByText(/Page was not found/i);
    expect(errorDisplayed).toBeTruthy();
  });
});
