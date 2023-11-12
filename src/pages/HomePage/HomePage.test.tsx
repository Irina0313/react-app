import HomePage from './HomePage';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { LoadingContext } from '../../context';
import { ProductsContext } from '../../context';
import { mockContext } from '../../__mocks__/mockContext';
import { IApiResp } from '../../api/Client';

let mockShowError = false;
let loading = false;

const mockHandlePaginatorBtnsClick = jest.fn(() => {});
describe('Home Page tests', () => {
  function inizializePage(loading: boolean, mockContext: IApiResp | null) {
    render(
      <BrowserRouter>
        <LoadingContext.Provider value={loading}>
          <ProductsContext.Provider value={mockContext}>
            <HomePage
              showError={mockShowError}
              handlePaginatorBtnsClick={mockHandlePaginatorBtnsClick}
            />
          </ProductsContext.Provider>
        </LoadingContext.Provider>
      </BrowserRouter>
    );
  }
  test('if a new value for the number of items on the page is selected, it is written as a value and displayed', () => {
    inizializePage(loading, mockContext);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 40 } });
    const displayedValue = screen.getByDisplayValue(40);
    expect(displayedValue).toBeTruthy();
  });
  test('Check that an appropriate message is displayed if no cards are present.', () => {
    mockShowError = false;
    inizializePage(loading, null);
    const notFoundPageTitle = screen.getByText('Page was not found');
    expect(notFoundPageTitle).toBeTruthy();
  });

  test('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    mockShowError = true;
    inizializePage(loading, mockContext);
    const notFoundPageTitle = screen.getByText('Page was not found');
    expect(notFoundPageTitle).toBeTruthy();
  });

  test('if data is loading, the "Loading..." massage is displayed', () => {
    loading = true;
    inizializePage(loading, mockContext);
    const loadingText = screen.getByText(/Loading.../i);

    expect(loadingText).toBeTruthy();
  });
});
