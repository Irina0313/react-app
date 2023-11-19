import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Product from './Product';
import { mockData } from '../../__mocks__/mockData';

afterEach(() => {
  cleanup();
});
describe('Product component', () => {
  const product = mockData.products[0];
  test('Ensure that the card component renders the relevant card data', () => {
    render(
      <BrowserRouter>
        <Product {...product} />
      </BrowserRouter>
    );

    const title = screen.getByText('iPhone 9');

    expect(title).toBeTruthy();
    expect(screen.queryByText(/Brand: Golden/i)).toBeTruthy();
    expect(screen.queryByText(/Category: smartphones/i)).toBeTruthy();
    expect(screen.queryByText(/Price: 549/i)).toBeTruthy();
  });
});
