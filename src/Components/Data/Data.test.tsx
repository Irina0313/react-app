import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, act, cleanup } from '@testing-library/react';
import Data from './Data';
import { mockData } from '../../__mocks__/mockData';

afterEach(() => {
  cleanup();
});
describe('Data tests', () => {
  function initializePage() {
    jest.clearAllMocks();
    render(
      <BrowserRouter>
        <Data data={mockData} />
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
      const mockProductsLength = mockData.products.length;
      const cards = screen.getAllByRole('link');
      expect(cards.length).toBe(mockProductsLength);
    });
  });
});
