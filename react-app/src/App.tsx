import { Component } from 'react';
import Search from './Components/Search/Search';
import Data from './Components/Data/Data';
import './App.css';
import Client from './api/Client';
import { PlanetProps } from './Components/Data/Planet';

interface DataState {
  planets: PlanetProps[];
  loading: boolean;
}
interface AppProps {}
class App extends Component<AppProps, DataState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      planets: [],
      loading: false,
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
      console.error('Error fetching data:', error);
      this.setState({ loading: false });
    }
  }

  handleSearch = async (searchQuery: string) => {
    this.loadPlanets(searchQuery);
  };

  render() {
    return (
      <main className="mainWrapper">
        <h1 className="mainTitle">Star Wars Planets</h1>
        <Search onSearch={this.handleSearch} />
        {this.state.loading ? (
          <div className={`loading`}>Loading...</div>
        ) : (
          <Data planets={this.state.planets} />
        )}
      </main>
    );
  }
}

export default App;
