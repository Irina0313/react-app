import { Component } from 'react';

class Search extends Component {
  state = {
    savedSearch: localStorage.getItem('savedSearch')
      ? JSON.parse(localStorage.savedSearch)
      : '',
  };
  hundleSubmit = () => {
    localStorage.savedSearch = JSON.stringify(this.state.savedSearch);
  };

  render() {
    return (
      <section>
        <div>
          <form onSubmit={this.hundleSubmit}>
            <input
              value={this.state.savedSearch}
              type="text"
              onChange={(e) =>
                this.setState({
                  savedSearch: e.target.value,
                })
              }
            />
            <button>Search</button>
          </form>
        </div>
      </section>
    );
  }
}

export default Search;
