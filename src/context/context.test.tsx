import { ProductsContext, SearchContext } from '.';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

test('ProductsContext is a valid React context', () => {
  expect(ProductsContext.Provider).toBeDefined();
  expect(ProductsContext.Consumer).toBeDefined();
});

test('Default value of ProductsContext is null', () => {
  const { container } = render(
    <BrowserRouter>
      <ProductsContext.Provider value={null}>
        <ProductsContext.Consumer>{() => null}</ProductsContext.Consumer>
      </ProductsContext.Provider>
    </BrowserRouter>
  );
  expect(container.firstChild).toBeNull();
});

test('searchContext is a valid React context', () => {
  expect(SearchContext.Provider).toBeDefined();
  expect(SearchContext.Consumer).toBeDefined();
});
