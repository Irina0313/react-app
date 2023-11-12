import { render, fireEvent, waitFor } from '@testing-library/react';
import ProductImage from './ProductImage';
import { ProductsContext } from '../../context';
import { mockContext } from '../../__mocks__/mockContext';

const mockId = mockContext.products[0].id;
const mockIsModalImage = false;

describe('Product image tests', () => {
  const { getByTestId } = render(
    <ProductImage id={mockId} isModalImage={!mockIsModalImage} />
  );

  const productImageElement = getByTestId('productImage');
  test('image must have alt text', () => {
    const mockId = 20;
    const { getAllByAltText } = render(<ProductImage id={mockId} />);

    expect(getAllByAltText(/product image/i)).toBeTruthy();
  });

  test('image must have right class name', () => {
    expect(productImageElement).toBeDefined();
  });

  test('sets imageError to true on image load error', async () => {
    const { container } = render(
      <ProductImage id={mockId} isModalImage={mockIsModalImage} />
    );

    const productImageElement = container.querySelector(
      'img'
    ) as HTMLImageElement;

    fireEvent.error(productImageElement, {
      target: productImageElement,
    });

    const errorImageSrc = /\/no-image-png-2\.png$/;

    await waitFor(() => {
      expect(productImageElement.src).toMatch(errorImageSrc);
    });
  });
});

describe('products to be rigth filtered', () => {
  test('it could get context and filter products from it', () => {
    const { getByTestId } = render(
      <ProductsContext.Provider value={mockContext}>
        <ProductImage id={mockId} isModalImage={mockIsModalImage} />
      </ProductsContext.Provider>
    );

    const image = getByTestId('productImage') as HTMLImageElement;
    const expectedSrc = mockContext.products[0].images[0];

    expect(image.src).toEqual(expectedSrc);
  });
});
