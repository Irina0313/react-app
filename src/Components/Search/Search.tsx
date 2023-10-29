import { useState, FormEvent } from 'react';
import './Search.css';

interface SearchProps {
  onSearch: (searchQuery: string) => void;
}

function Search({ onSearch }: SearchProps) {
  const [savedSearch, setSavedSearch] = useState(
    localStorage.getItem('savedSearch')
      ? JSON.parse(localStorage.savedSearch)
      : ''
  );

  const updateSavedSearch = (value: string) => {
    setSavedSearch(value.trim());
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    localStorage.savedSearch = JSON.stringify(savedSearch);
    onSearch(savedSearch);
  };

  return (
    <section>
      <form className="searchWrapper">
        <input
          className="searchInput"
          defaultValue={savedSearch}
          type="text"
          placeholder="Type in the name of the planet"
          onChange={(e) => updateSavedSearch(e.target.value)}
        />
        <button className="button searchBtn" onClick={handleSearch}>
          Search
        </button>
      </form>
    </section>
  );
}

export default Search;
