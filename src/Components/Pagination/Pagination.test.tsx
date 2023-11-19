import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  cleanup,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Pagination from './Pagination';
import { mockData } from '../../__mocks__/mockData';
import { IApiResp } from '../../store/productsAPI';

const data: IApiResp = mockData;
let isLoading = false;

jest.mock('../../store/productsAPI', () => ({
  ...jest.requireActual('../../store/productsAPI'),
  useGetCurrentStateParams: jest.fn(() => ({
    itemsPerPage: 30,
    searchRequest: '',
  })),
}));

jest.mock('../../store/productsAPI', () => ({
  ...jest.requireActual('../../store/productsAPI'),
  useGetProductsQuery: jest.fn(() => ({
    data: data,
    isFetching: isLoading,
    isLoading: isLoading,
    isError: false,
  })),
}));

function initializePage() {
  jest.clearAllMocks();
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Pagination />
      </Provider>
    </BrowserRouter>
  );
}

afterEach(() => {
  cleanup();
});

describe('Pagination component', () => {
  test('renders without crashing', async () => {
    await act(async () => {
      initializePage();
    });

    expect(screen.getByTestId('paginationComponent')).toBeTruthy();
  });

  test('Pagination is rendered', async () => {
    isLoading = false;

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
  test('handles select change correctly', async () => {
    const onPaginatorBtnsClickMock = jest.fn();

    await act(async () => {
      initializePage();
    });

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '10' } });

    waitFor(() => {
      expect(onPaginatorBtnsClickMock).toHaveBeenCalledWith(1, 10);
    });
  });

  test('disables prev button on the first page', async () => {
    await act(async () => {
      initializePage();
    });

    expect(screen.getByText('prev')).toBeDisabled();
  });

  test('renders the correct current page number', async () => {
    await act(async () => {
      initializePage();
    });

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
  const mockHandleClick = jest.fn();

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

  test('buttons and select input should be disabled if data is loading ', async () => {
    isLoading = true;

    await act(async () => {
      initializePage();
    });

    const prevBtn = screen.getByRole('button', { name: 'prev' });
    expect(prevBtn).toBeDisabled();
    const nextBtn = screen.getByRole('button', { name: 'next' });
    expect(nextBtn).toBeDisabled();
    const itemsPerPage = screen.getByRole('combobox');
    expect(itemsPerPage).toBeDisabled();
  });

  test('it should display right page numder and items per page when users use pagination', async () => {
    await act(async () => {
      initializePage();
    });

    const nextBtn = screen.getByText(/next/i);
    const prevBtn = screen.getByText(/prev/i);
    const itemsPerPage = screen.getByRole('combobox');

    expect(itemsPerPage).toBeTruthy();
    fireEvent.select(itemsPerPage, { value: '10' });

    waitFor(() => {
      expect(screen.getByDisplayValue('10')).toBeTruthy();
    });

    expect(prevBtn).toBeDisabled();
    expect(prevBtn).toBeTruthy();
    fireEvent.click(prevBtn);
    expect(screen.getByTestId('currPageNumber')).toHaveTextContent('1');
    expect(nextBtn).toBeTruthy();
    fireEvent.click(nextBtn);

    waitFor(() => {
      expect(screen.getByTestId('currPageNumber')).toHaveTextContent('2');
    });
  });
});
