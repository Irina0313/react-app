import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';
import MainPage from '../pages';
import { getServerSideProps } from '../pages';
import { mockData } from '@/mocks/mockData';
import { mockProduct } from '@/mocks/mockProduct';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('MainPage component', () => {
  it('renders NotFoundPage when data is null', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });

    render(<MainPage data={null} product={null} />);

    const notFoundElement = screen.getByText(/Not Found/i);
    expect(notFoundElement).toBeInTheDocument();
  });

  it('renders Layout when data is not null', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1', items: '30' },
    });

    const mockProps = {
      data: mockData,
      product: mockProduct,
    };

    render(<MainPage {...mockProps} />);

    expect(screen.getByText('iPhone 9')).toBeInTheDocument();
  });
});

export const gsspCtx = (
  ctx?: Partial<GetServerSidePropsContext>
): GetServerSidePropsContext => ({
  req: createRequest(),
  res: createResponse(),
  params: undefined,
  query: {},
  resolvedUrl: '',
  ...ctx,
});
describe('Tests for the Home Page', () => {
  it('Ensure that the Home Page display mock data', async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1', items: '30' },
    });

    const res = await getServerSideProps(gsspCtx());

    expect(res).toHaveProperty('redirect');
  });
});
