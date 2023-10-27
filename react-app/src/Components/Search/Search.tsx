import { Component, FormEvent } from 'react';
import './Search.css';

interface Props {
  onSearch: (searchQuery: string) => void;
}

interface State {
  savedSearch: string;
}

class Search extends Component<Props, State> {
  state = {
    savedSearch: localStorage.getItem('savedSearch')
      ? JSON.parse(localStorage.savedSearch)
      : '',
  };
  updateSavedSearch = (value: string) => {
    this.setState({
      savedSearch: value.trim(),
    });
  };

  handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    localStorage.savedSearch = JSON.stringify(this.state.savedSearch);
    this.props.onSearch(this.state.savedSearch);
  };

  render() {
    return (
      <section>
        <form className="searchWrapper">
          <input
            className="searchInput"
            defaultValue={this.state.savedSearch}
            type="text"
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
