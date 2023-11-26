import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import Data from '.';
import { mockData } from '@/mocks/mockData';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Data component', () => {
  it('renders products', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
    });

    render(<Data data={mockData} />);

    const dataSection = screen.getByTestId('dataSection');
    expect(dataSection).toBeInTheDocument();

    const productElements = screen.getAllByRole('link');
    expect(productElements).toHaveLength(mockData.products.length);
  });
});
