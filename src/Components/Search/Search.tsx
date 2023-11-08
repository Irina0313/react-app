import { useState, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import { SearchContext } from '../../context/context';

function Search() {
  const { onSearch, prevSearchParams } = useContext(SearchContext);
  const [currSearchParams, setCurrSearchParams] = useState(prevSearchParams);

  const navigate = useNavigate();

  const updateSavedSearch = (value: string) => {
    setCurrSearchParams(value.trim());
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    navigate(`/page=1`);
    onSearch(currSearchParams);
  };

  return (
    <section>
      <form className="searchWrapper">
        <input
          className="searchInput"
          defaultValue={currSearchParams || ''}
          type="search"
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
