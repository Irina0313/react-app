import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxsHooks';
import { updateSearchRequest } from '../../store/searchSlice';
import './Search.css';

function Search() {
  const dispatch = useAppDispatch();
  const initialSearch = useAppSelector(
    (state) => state.searchRequest.searchRequest
  );
  const [currSearchParams, setCurrSearchParams] = useState<string | null>(
    initialSearch
  );
  const navigate = useNavigate();

  const updateSavedSearch = (value: string) => {
    setCurrSearchParams(value.trim());
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    navigate(`/page=1`);
    dispatch(updateSearchRequest(currSearchParams));
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
