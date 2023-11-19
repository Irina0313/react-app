import {
  render,
  fireEvent,
  act,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Search from './Search';
import { mockSetItem } from '../../__mocks__/mockLocalStorage';

afterEach(() => {
  cleanup();
});

describe('Search component tests', () => {
  const mockOnSearch = jest.fn();

  function initializePage() {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );
  }

  test('Verify that clicking the Search button saves the entered value to the local storage and checks that the component retrieves the value from local storage upon mounting.', async () => {
    // Render the component
    initializePage();

    // Find the search input and change its value
    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'mock search text' } });

    // Click the search button
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    // Wait for the search value to be displayed
    await waitFor(() => {
      const displayedSearchValue = screen.getByDisplayValue('mock search text');
      expect(displayedSearchValue).toBeTruthy();
      expect(mockSetItem).toHaveBeenCalledTimes(1);
      expect(mockSetItem).toHaveBeenCalledWith(
        'savedSearch',
        JSON.stringify('mock search text')
      );
    });
    cleanup();
    // Re-render the component
    initializePage();

    // Check that the Search input value is retrieved from local storage upon mounting
    const displayedSearchValue = screen.getByDisplayValue('mock search text');
    expect(displayedSearchValue).toBeTruthy();
  });

  test('the input field responds correctly to the search query entering', async () => {
    await act(async () => {
      initializePage();
    });

    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toBeTruthy();

    fireEvent.change(searchInput, { target: { value: 'new search query  ' } });

    const displayedSearchValue = screen.getByDisplayValue('new search query');
    expect(displayedSearchValue).toBeTruthy();

    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    await act(() => Promise.resolve());

    waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalled();
      expect(mockOnSearch).toHaveBeenCalledWith('new search query');
    });
  });
});
