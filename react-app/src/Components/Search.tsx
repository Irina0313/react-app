import { Component } from 'react';
import Client from '../api/Client';
const client = new Client();

/* const getInfo = async () => {
  const resp = await fetch('https://swapi.dev/api/planets/1');
  const commits = await resp.json();
  console.log(commits);
}; */
interface Props {}
interface State {
  savedSearch: string;
}
class Search extends Component<Props, State> {
  state = {
    savedSearch: localStorage.getItem('savedSearch')
      ? JSON.parse(localStorage.savedSearch)
      : '',
  };

  hundleSubmit = async () => {
    localStorage.savedSearch = JSON.stringify(this.state.savedSearch);
    client.getData('films');
  };

  render() {
    return (
      <section>
        <div>
          <input
            defaultValue={this.state.savedSearch}
            type="text"
            onChange={(e) =>
              this.setState({
                savedSearch: e.target.value,
              })
            }
          />
          <button onClick={this.hundleSubmit}>Search</button>
        </div>
      </section>
    );
  }
}

export default Search;
