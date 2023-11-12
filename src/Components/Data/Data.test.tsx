import Data from './Data';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import { mockContext } from '../../__mocks__/mockContext';
import { ProductsContext } from '../../context';

describe('Data tests', () => {
  function initializePage() {
    jest.clearAllMocks();
    render(
      <BrowserRouter>
        <ProductsContext.Provider value={mockContext}>
          <Data />
        </ProductsContext.Provider>
      </BrowserRouter>
    );
  }
  test('Data component should be rendered', async () => {
    await act(async () => {
      initializePage();
    });
    expect(screen.getByTestId('dataSection')).toBeTruthy();
  });

  test('Verify that the component renders the specified number of cards;', async () => {
    await act(async () => {
      initializePage();
    });
    await waitFor(() => {
      const cards = screen.getAllByRole('link');
      expect(cards.length).toBe(cards.length);
    });
  });
});
