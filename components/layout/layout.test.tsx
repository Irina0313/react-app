import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import Layout from '.';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Layout component', () => {
  it('renders layout without error component', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });

    render(<Layout>{<div>Test component</div>}</Layout>);

    const layoutContainer = screen.getByText('Test component');

    expect(layoutContainer).toBeInTheDocument();
  });
});
