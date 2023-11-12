import Search from './Search';
import { render, fireEvent, act } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import { SearchContext } from '../../context';
import '@testing-library/jest-dom';

describe('Search component tests', () => {
  const mockOnSearch = jest.fn();
  const mockPrevSearchParams = 'mySearch';

  function inizializePage() {
    render(
      <BrowserRouter>
        <SearchContext.Provider
          value={{
            onSearch: mockOnSearch,
            prevSearchParams: mockPrevSearchParams,
          }}
        >
          <Search />
        </SearchContext.Provider>
      </BrowserRouter>
    );
  }

  test('the input field responds correctly to the search query entering', async () => {
    inizializePage();

    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toBeTruthy();

    fireEvent.change(searchInput, { target: { value: 'new search query  ' } });

    const displayedSearchValue = screen.getByDisplayValue('new search query');
    expect(displayedSearchValue).toBeTruthy();

    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    await act(() => Promise.resolve());

    expect(mockOnSearch).toHaveBeenCalledWith('new search query');
  });
});
