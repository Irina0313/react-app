import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Product from './Product';
import { mockContext } from '../../__mocks__/mockContext';
import { ProductsContext } from '../../context';

describe('Product component', () => {
  it('Ensure that the card component renders the relevant card data', () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider value={mockContext}>
          <Product id={20} />
        </ProductsContext.Provider>
      </BrowserRouter>
    );

    const title = screen.getByText('iPhone 9');

    expect(title).toBeTruthy();
    expect(screen.queryByText(/Brand: Golden/i)).toBeTruthy();
    expect(screen.queryByText(/Category: smartphones/i)).toBeTruthy();
    expect(screen.queryByText(/Price: 549/i)).toBeTruthy();
  });
});
