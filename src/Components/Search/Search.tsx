import { Component, FormEvent } from 'react';
import './Search.css';

interface SerchProps {
  onSearch: (searchQuery: string | null) => void;
}

interface State {
  savedSearch: string | null;
}

class Search extends Component<SerchProps, State> {
  constructor(params: SerchProps) {
    super(params);

    this.state = { savedSearch: localStorage.savedSearch && null };
  }

  updateSavedSearch = (value: string) => {
    this.setState(() => ({
      savedSearch: value.trim(),
    }));
  };

  handleSearch = async (e: FormEvent) => {
    const { savedSearch } = this.state;
    e.preventDefault();
    localStorage.savedSearch = JSON.stringify(savedSearch);
    this.props.onSearch(savedSearch);
  };

  render() {
    return (
      <section>
        <form className="searchWrapper">
          <input
            className="searchInput"
            defaultValue={this.state.savedSearch as string}
            type="search"
            placeholder="Type in the name of the planet"
            onChange={(e) => this.updateSavedSearch(e.target.value)}
          />
          <button className="button searchBtn" onClick={this.handleSearch}>
            Search
          </button>
        </form>
      </section>
    );
  }
}

export default Search;
