// Pagination.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '.';
import { mockData } from '@/mocks/mockData';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Pagination component', () => {
  it('renders pagination with correct page number', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1', items: '30' },
    });

    render(<Pagination {...mockData} />);

    const paginationComponent = screen.getByTestId('paginationComponent');
    const currPageNumber = screen.getByTestId('currPageNumber');

    expect(paginationComponent).toBeInTheDocument();
    expect(currPageNumber).toHaveTextContent('1');
  });

  it('handles click on "prev" button correctly', () => {
    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '2', items: '10' },
      push: mockRouterPush,
    });

    render(<Pagination {...mockData} />);

    const prevButton = screen.getByText('prev');
    fireEvent.click(prevButton);

    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: undefined,
      query: { page: '1', items: '10' },
    });
  });

  it('handles click on "next" button correctly', () => {
    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '2', items: '10' },
      push: mockRouterPush,
    });

    render(<Pagination {...mockData} />);

    const nextButton = screen.getByText('next');
    fireEvent.click(nextButton);

    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: undefined,
      query: { page: '3', items: '10' },
    });
  });

  it('handles select option change correctly', () => {
    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '2', items: '10' },
      push: mockRouterPush,
    });

    render(<Pagination {...mockData} />);

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: '20' } });

    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: undefined,
      query: { page: '1', items: '20' },
    });
  });
});
