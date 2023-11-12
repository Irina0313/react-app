import ProductPage from './ProductPage';
import { LoadingContext, ProductsContext } from '../../context';
import { mockContext } from '../../__mocks__/mockContext';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../hooks/getURLParams', () => {
  return () => ({
    pageNumber: 1,
    id: mockContext.products[0].id,
  });
});

describe('Product page tests', () => {
  const mockGetProducts = jest.fn();
  let mockLoaderValue = false;

  function initializePage() {
    render(
      <BrowserRouter>
        <ProductsContext.Provider value={mockContext}>
          <LoadingContext.Provider value={mockLoaderValue}>
            <ProductPage getProducts={mockGetProducts} />
          </LoadingContext.Provider>
        </ProductsContext.Provider>
      </BrowserRouter>
    );
  }

  test('Check that a loading indicator is displayed while fetching data', () => {
    mockLoaderValue = true;
    initializePage();
    const loaderText = screen.getByText(/Loading.../i);
    expect(loaderText).toBeTruthy();
  });
  test('if LoadingContext has value false, loader should not be displayed', () => {
    mockLoaderValue = false;
    initializePage();
    const loaderText = screen.queryByText('Loading...');
    expect(loaderText).toBeNull();
  });
  test('Make sure the detailed card component correctly displays the detailed card data;', () => {
    initializePage();

    const productTitle = screen.getByText(mockContext.products[0].title);
    const productCategory = screen.getByText(mockContext.products[0].category, {
      exact: false,
    });
    const productPrice = screen.getByText(mockContext.products[0].price, {
      exact: false,
    });

    const productImage = screen.queryAllByRole('img');
    const productDescription = screen.getByText(
      mockContext.products[0].description
    );

    expect(productTitle).toBeTruthy();
    expect(productCategory).toBeTruthy();
    expect(productPrice).toBeTruthy();
    expect(productImage).toBeTruthy();
    expect(productDescription).toBeTruthy();
  });

  test('Ensure that clicking the close button hides the component', async () => {
    initializePage();

    const productModal = screen.queryByTestId('modalBackdrop');
    expect(productModal).toBeTruthy();
    expect(productModal).toHaveClass('open');

    const closeBtn = screen.getByRole('button');
    fireEvent.click(closeBtn);

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
    render(
      <BrowserRouter>
        <ProductsContext.Provider value={null}>
          <LoadingContext.Provider value={mockLoaderValue}>
            <ProductPage getProducts={mockGetProducts} />
          </LoadingContext.Provider>
        </ProductsContext.Provider>
      </BrowserRouter>
    );

    const sorryMessage = screen.queryByText('Sorry... Nothing was found');
    expect(sorryMessage).toBeTruthy();
  });
});
