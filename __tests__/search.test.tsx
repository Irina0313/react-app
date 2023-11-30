import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Search from '../components/search';
import { NextRouter, useRouter } from 'next/router';

type MockRouter = Partial<NextRouter>;

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    query: {},
    push: jest.fn(),
  })) as () => MockRouter,
}));

const mockRouter: MockRouter = {
  query: {},
  push: jest.fn(),
};

describe('Search component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders the search input with the correct default value', () => {
    render(<Search />);
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('');
  });

  it('updates the input value on user input', () => {
    render(<Search />);
    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput).toHaveValue('test');
  });

  it('submits the form and calls router.push with the correct query', async () => {
    render(<Search />);
    const searchInput = screen.getByRole('searchbox');
    const searchButton = screen.getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    fireEvent.click(searchButton);

    await act(async () => {});

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: undefined,
      query: {
        search: 'test',
        page: '1',
      },
    });
  });
});
