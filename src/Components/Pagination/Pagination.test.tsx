import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Pagination from './Pagination';
import { ProductsContext } from '../../context';
import { mockContext } from '../../__mocks__/mockContext';
import { LoadingContext } from '../../context';

jest.mock('../../hooks/getURLParams', () => ({
  __esModule: true,
  default: jest.fn(() => ({ pageNumber: '1' })),
}));

describe('Pagination component', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Pagination onPaginatorBtnsClick={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByTestId('paginationComponent')).toBeTruthy();
  });

  test('handles prev or next button click correctly', async () => {
    const onPaginatorBtnsClickMock = jest.fn();
    render(
      <BrowserRouter>
        <ProductsContext.Provider value={mockContext}>
          <Pagination onPaginatorBtnsClick={onPaginatorBtnsClickMock} />
        </ProductsContext.Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('next'));
    await waitFor(() => {
      expect(onPaginatorBtnsClickMock).toHaveBeenCalledWith(2, 30);
    });
    fireEvent.click(screen.getByText('prev'));

    expect(onPaginatorBtnsClickMock).toHaveBeenCalled();
  });

  test('handles select change correctly', () => {
    const onPaginatorBtnsClickMock = jest.fn();
    render(
      <BrowserRouter>
        <Pagination onPaginatorBtnsClick={onPaginatorBtnsClickMock} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '10' } });
    expect(onPaginatorBtnsClickMock).toHaveBeenCalledWith(1, 10);
  });

  test('disables prev button on the first page', () => {
    render(
      <BrowserRouter>
        <Pagination onPaginatorBtnsClick={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText('prev')).toBeDisabled();
  });

  test('renders the correct current page number', () => {
    const onPaginatorBtnsClickMock = jest.fn();

    render(
      <BrowserRouter>
        <Pagination onPaginatorBtnsClick={onPaginatorBtnsClickMock} />
      </BrowserRouter>
    );

    expect(screen.getByTestId('currPageNumber')).toHaveTextContent('1');
  });
});

describe('Pagination tests, Make sure the component updates URL query parameter when page changes', () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

  const mockOnPaginatorBtnsClick = jest.fn();
  const { navigate } = require('react-router-dom');
  let loading = false;
  const mockHandleClick = jest.fn();

  function initializePage() {
    jest.clearAllMocks();
    render(
      <BrowserRouter>
        <LoadingContext.Provider value={loading}>
          <Pagination onPaginatorBtnsClick={mockOnPaginatorBtnsClick} />
        </LoadingContext.Provider>
      </BrowserRouter>
    );
  }

  test('Pagination is rendered', async () => {
    await act(async () => {
      initializePage();
    });

    const nextBtn = screen.getByRole('button', { name: 'next' });
    const prevBtn = screen.getByRole('button', { name: 'prev' });
    const currPage = screen.getByTestId('currPageNumber');
    const itemsPerPage = screen.getByRole('combobox');

    expect(nextBtn).toBeTruthy();
    expect(prevBtn).toBeTruthy();
    expect(currPage).toBeTruthy();
    expect(itemsPerPage).toBeTruthy();
    expect(screen.getByDisplayValue('30')).toBeTruthy();
  });

  test('it should change the page number when the prev button is clicked', async () => {
    await act(async () => {
      initializePage();
    });

    const prevBtn = screen.getByRole('button', { name: 'prev' });
    fireEvent.click(prevBtn);

    waitFor(() => {
      expect(mockHandleClick).toHaveBeenCalledWith('prev');
      expect(mockOnPaginatorBtnsClick).not.toHaveBeenCalled();
    });

    await act(async () => {
      initializePage();
    });

    fireEvent.click(prevBtn);

    waitFor(() => {
      expect(mockHandleClick).toHaveBeenCalledWith('prev');
      expect(mockOnPaginatorBtnsClick).toHaveBeenCalledWith('prev');
      expect(navigate).toHaveBeenCalledWith(`/page=1`);
      expect(screen.getByTestId('currPageNumber')).toHaveTextContent('1');
      expect(mockOnPaginatorBtnsClick).toHaveBeenCalled();
    });
  });

  test('it should change the page number when the next button is clicked', async () => {
    await act(async () => {
      initializePage();
    });

    const nextBtn = screen.getByRole('button', { name: 'next' });
    fireEvent.click(nextBtn);

    waitFor(() => {
      expect(mockHandleClick).toHaveBeenCalledWith('next');
      expect(mockOnPaginatorBtnsClick).toHaveBeenCalledWith('next');
      expect(navigate).toHaveBeenCalledWith(`/page=2}`);
      expect(screen.getByTestId('currPageNumber')).toHaveTextContent('2');
      expect(mockOnPaginatorBtnsClick).toHaveBeenCalled();
    });
  });

  test('it should change items per page', async () => {
    await act(async () => {
      initializePage();
    });

    const itemsPerPage = screen.getByRole('combobox');
    const prevBtn = screen.getByRole('button', { name: 'prev' });
    fireEvent.select(itemsPerPage, { value: '10' });

    waitFor(() => {
      expect(mockOnPaginatorBtnsClick).toHaveBeenCalledWith(1, 10);
      expect(navigate).toHaveBeenCalledWith(`/page=1`);
      expect(screen.getByDisplayValue('10')).toBeTruthy();
      expect(prevBtn).toBeDisabled();
    });
  });

  test('buttons and select input should be disabled if data is loading ', () => {
    loading = true;

    render(
      <BrowserRouter>
        <LoadingContext.Provider value={loading}>
          <Pagination onPaginatorBtnsClick={mockOnPaginatorBtnsClick} />
        </LoadingContext.Provider>
      </BrowserRouter>
    );

    const prevBtn = screen.getByRole('button', { name: 'prev' });
    expect(prevBtn).toBeDisabled();
    const nextBtn = screen.getByRole('button', { name: 'next' });
    expect(nextBtn).toBeDisabled();
    const itemsPerPage = screen.getByRole('combobox');
    expect(itemsPerPage).toBeDisabled();

    loading = false;
  });
});
