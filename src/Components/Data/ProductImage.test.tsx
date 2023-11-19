import '@testing-library/jest-dom';
import {
  render,
  act,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductImage from './ProductImage';
import { mockData } from '../../__mocks__/mockData';

const mockImageURL = mockData.products[0].images[0];
const mockIsModalImage = false;

afterEach(() => {
  cleanup();
});

describe('Product image tests', () => {
  function initializePage() {
    jest.clearAllMocks();
    render(
      <BrowserRouter>
        <ProductImage url={mockImageURL} isModalImage={!mockIsModalImage} />
      </BrowserRouter>
    );
  }

  test('it could be rendered', async () => {
    await act(async () => {
      initializePage();
    });
    const productImageElement = screen.getByTestId('productImage');
    expect(productImageElement).toBeTruthy();
  });

  test('image must have alt text', async () => {
    await act(async () => {
      initializePage();
    });
    const productImageElement = screen.getByAltText(/product image/i);

    expect(productImageElement).toBeTruthy();
  });

  test('image must have right class name', async () => {
    await act(async () => {
      initializePage();
    });

    const productImageElement = screen.getByTestId('productImage');
    expect(productImageElement).toHaveClass('modalImage');
  });

  test('sets imageError to true on image load error', async () => {
    const { container } = render(
      <BrowserRouter>
        <ProductImage url={mockImageURL} isModalImage={mockIsModalImage} />
      </BrowserRouter>
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
