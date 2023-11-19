import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import {
  fireEvent,
  render,
  waitFor,
  act,
  cleanup,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductPage from './ProductPage';
import { mockData } from '../../__mocks__/mockData';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { mockProduct } from '../../__mocks__/mockProduct';

let isLoading = false;

jest.mock('../../hooks/getURLParams', () => {
  return () => ({
    pageNumber: 1,
    id: mockData.products[0].id,
  });
});

jest.mock('../../store/productsAPI', () => ({
  ...jest.requireActual('../../store/productsAPI'),
  useGetProductByIdQuery: jest.fn(() => ({
    data: mockProduct,
    isFetching: isLoading,
    isLoading: isLoading,
    isError: false,
  })),
}));

afterEach(() => {
  cleanup();
});
describe('Product page tests', () => {
  function initializePage() {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductPage />
        </Provider>
      </BrowserRouter>
    );
  }

  test('Check that a loading indicator is displayed while fetching data', async () => {
    isLoading = true;

    await act(async () => {
      initializePage();
    });

    const loaderText = screen.getByText(/Loading.../i);

    expect(loaderText).toBeTruthy();
    isLoading = false;
  });
  test('if LoadingContext has value false, loader should not be displayed', async () => {
    await act(async () => {
      initializePage();
    });

    const loaderText = screen.queryByText('Loading...');
    waitFor(() => {
      expect(loaderText).toBeNull();
    });
  });

  test('Ensure that clicking the close button hides the component', async () => {
    isLoading = false;

    await act(async () => {
      initializePage();
    });

    const productModal = screen.queryByTestId('modalBackdrop');
    expect(productModal).toBeTruthy();
    expect(productModal).toHaveClass('open');

    const closeBtn = screen.getAllByRole('button');

    fireEvent.click(closeBtn[0]);

    waitFor(
      () => {
        expect(productModal).toBeNull();
      },
      { timeout: 1000 }
    );
  });

  test('if is is clicked outside of the detailed product page, the Product Page should be closed', async () => {
    initializePage();

    const productModal = screen.queryByTestId('modalBackdrop') as HTMLElement;
    expect(productModal).toBeTruthy();

    fireEvent.click(productModal);

    waitFor(
      () => {
        expect(productModal).toBeNull();
      },
      { timeout: 1000 }
    );
  });

  test('if the product is not found, the message "Sorry..." is displayed', async () => {
    await act(async () => {
      initializePage();
    });

    const sorryMessage = screen.queryByText('Sorry... Nothing was found');
    waitFor(() => {
      expect(sorryMessage).toBeTruthy();
    });
  });

  test('Make sure the detailed card component correctly displays the detailed card data;', async () => {
    await act(async () => {
      initializePage();
    });

    const productTitle = screen.getByText(mockData.products[0].title);
    const productCategory = screen.getByText(mockData.products[0].category, {
      exact: false,
    });
    const productPrice = screen.getByText(mockData.products[0].price, {
      exact: false,
    });

    const productImage = screen.queryAllByRole('img');

    const productDescription = screen.getByText(
      mockData.products[0].description
    );

    waitFor(() => {
      expect(productTitle).toBeTruthy();
      expect(productCategory).toBeTruthy();
      expect(productPrice).toBeTruthy();
      expect(productImage).toBeTruthy();
      expect(productDescription).toBeTruthy();
    });
  });
});
