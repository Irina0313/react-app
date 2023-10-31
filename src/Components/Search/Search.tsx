import { useState, FormEvent } from 'react';
import './Search.css';

interface SearchProps {
  onSearch: (searchQuery: string | null) => void;
  prevSearchParams: string | null;
}

function Search({ onSearch, prevSearchParams }: SearchProps) {
  const [currSearchParams, setCurrSearchParams] = useState(prevSearchParams);

  const updateSavedSearch = (value: string) => {
    setCurrSearchParams(value.trim());
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    onSearch(currSearchParams);
  };

  return (
    <section>
      <form className="searchWrapper">
        <input
          className="searchInput"
          defaultValue={currSearchParams || ''}
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
