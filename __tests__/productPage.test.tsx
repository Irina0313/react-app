import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { mockProduct } from '@/mocks/mockProduct';
import ProductPage from '../components/productPage';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(() => ({
    query: { product: '1' },
    push: jest.fn(),
  })),
}));

describe('ProductPage component', () => {
  it('renders "Sorry... Nothing was found" when product is null', () => {
    render(<ProductPage product={null} />);

    const errorMessage = screen.getByText('Sorry... Nothing was found');
    const closeButton = screen.getByText('Close');

    expect(errorMessage).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  it('renders product details when product is not null', () => {
    render(<ProductPage product={mockProduct} />);

    const titleElement = screen.getByText('iPhone 9');
    const categoryElement = screen.getByRole('heading', { name: /Category:/i });

    const descriptionElement = screen.getByText(
      'An apple mobile which is nothing like apple'
    );
    const closeButton = screen.getByText('Close');

    expect(titleElement).toBeInTheDocument();
    expect(categoryElement).toBeInTheDocument();
    expect(categoryElement.textContent).toContain('smartphones');
    expect(descriptionElement).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  it('closes the modal when Close button is clicked', () => {
    const mockRouterPush = jest.fn();
    jest.mock('next/router', () => ({
      useRouter: () => ({
        query: { product: '1' },
        push: mockRouterPush,
      }),
    }));

    render(<ProductPage product={mockProduct} />);

    const closeButton = screen.getByText('Close');

    fireEvent.click(closeButton);
    waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname: undefined,
        query: {},
      });
    });
  });
});
