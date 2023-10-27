import { Component } from 'react';
import Search from './Components/Search/Search';
import Data from './Components/Data/Data';
import './App.css';
import Client from './api/Client';
import { PlanetProps } from './Components/Data/Planet';
import ErrorComponent from './Components/ErrorComponent';

interface DataState {
  planets: PlanetProps[];
  loading: boolean;
  showError: boolean;
  err: Error | null | unknown;
}
interface AppProps {}
class App extends Component<AppProps, DataState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      planets: [],
      loading: false,
      showError: false,
      err: null,
    };
  }

  async componentDidMount() {
    const isSavedSearchExists = localStorage.getItem('savedSearch') !== null;
    isSavedSearchExists
      ? await this.loadPlanets(JSON.parse(localStorage.savedSearch))
      : await this.loadPlanets();
  }

  async loadPlanets(searchQuery: string = '') {
    this.setState({ loading: true });
    try {
      const client = new Client();
      const planets: PlanetProps[] = searchQuery
        ? await client.search(searchQuery)
        : await client.getData();
      this.setState({ planets, loading: false });
    } catch (error) {
      this.setState({ loading: false, showError: true, err: error });
      console.error(`Error fetching data: ${error}`);
    }
  }

  handleSearch = async (searchQuery: string) => {
    this.loadPlanets(searchQuery);
  };

  handleError = (): void => {
    this.setState({ showError: true });
  };
  render() {
    return (
      <main className="mainWrapper">
        <div className="titleWrapper">
          <div style={{ width: '150px' }}></div>
          <h1 className="mainTitle">Star Wars Planets</h1>
          <button
            className="errorBtn"
            onClick={() => {
              return this.handleError();
            }}
          >
            Test error
          </button>
        </div>

        <Search onSearch={this.handleSearch} />
        {this.state.loading ? (
          <div className={`loading`}>Loading...</div>
        ) : this.state.showError ? (
          <ErrorComponent err={this.state.err} />
        ) : (
          <Data planets={this.state.planets} />
        )}
      </main>
    );
  }
}

export default App;
