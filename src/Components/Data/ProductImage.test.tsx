import { render, fireEvent, waitFor } from '@testing-library/react';
import ProductImage from './ProductImage';
import { ProductsContext } from '../../context/context';
import { mockContext } from '../../moks/mockContext';

const mockId = mockContext.products[0].id;
const mockIsModalImage = false;

describe('Product image tests', () => {
  const { container } = render(
    <ProductImage id={mockId} isModalImage={!mockIsModalImage}></ProductImage>
  );
  const productImageElement = container.querySelector(
    '.productImage'
  ) as HTMLImageElement;
  test('image must have alt text', () => {
    const mockId = 20;

    const { getAllByAltText } = render(
      <ProductImage id={mockId}></ProductImage>
    );
    expect(getAllByAltText(/product image/i)).toBeTruthy();
  });

  test('image must have right class name', () => {
    expect(productImageElement).toBeDefined();
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
  let container: HTMLDivElement | null;
  beforeEach(() => {
    container = document.createElement('div');

    document.body.appendChild(container);
  });
  afterEach(() => {
    container && document.body.removeChild(container);
    container = null;
  });
  test('it could be get context and filter products from it', () => {
    render(
      <ProductsContext.Provider value={mockContext}>
        <ProductImage id={mockId} isModalImage={mockIsModalImage} />
      </ProductsContext.Provider>
    );
    const image = document.querySelector('img') as unknown as HTMLImageElement;
    const exprctedSrc = mockContext.products[0].images[0];
    expect(image.src).toEqual(exprctedSrc);
  });
});
