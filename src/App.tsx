import { Component } from 'react';
import Search from './Components/Search/Search';
import Data from './Components/Data/Data';
import './App.css';
import Client from './api/Client';
import { PlanetProps } from './Components/Data/Planet';
import ErrorComponent from './Components/ErrorBoundary/ErrorComponent';
interface DataState {
  planets: PlanetProps[];
  loading: boolean;
  showError: boolean;
  err: Error | null | unknown;
  searchParams: string | null;
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
      searchParams: this.safeJsonParse(localStorage.savedSearch),
    };
  }

  private safeJsonParse = (s: string) => {
    try {
      return JSON.parse(s);
    } catch (e) {}

    return null;
  };

  async componentDidMount() {
    await this.loadPlanets(this.state.searchParams);
  }

  async loadPlanets(searchQuery: string | null = null) {
    this.setState({ loading: true });

    try {
      const client = new Client();
      const planets: PlanetProps[] = searchQuery
        ? await client.search(searchQuery)
        : await client.getData();
      this.setState({ planets, loading: false });
    } catch (error) {
      this.setState({ loading: false, showError: true, err: error });
    }
  }

  handleSearch = (searchQuery: string | null) => {
    localStorage.savedSearch = JSON.stringify(searchQuery);
    this.setState(() => ({
      searchParams: searchQuery,
    }));
    this.loadPlanets(searchQuery);
  };

  handleTestError = (): void => {
    this.setState({ showError: true });
  };

  render() {
    const { loading, err, planets, showError, searchParams } = this.state;
    return (
      <main className="mainWrapper">
        <div className="titleWrapper">
          <div style={{ width: '150px' }}></div>
          <h1 className="mainTitle">Star Wars Planets</h1>
          <button className="errorBtn" onClick={this.handleTestError}>
            Test error
          </button>
        </div>
        <Search onSearch={this.handleSearch} prevSearchParams={searchParams} />
        {loading && <div className={`loading`}>Loading...</div>}
        {showError && <ErrorComponent err={err} />}
        {!loading && !showError && <Data planets={planets} />}
      </main>
    );
  }
}

export default App;
