import { useState, useEffect } from 'react';
import Search from './Components/Search/Search';
import Data from './Components/Data/Data';
import './App.css';
import Client from './api/Client';
import { PlanetProps } from './Components/Data/Planet';
import ErrorComponent from './Components/ErrorBoundary/ErrorComponent';

function App() {
  const [planets, setPlanets] = useState<PlanetProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [err, setErr] = useState<Error | null | unknown>(null);

  const loadPlanets = async (searchQuery: string = '') => {
    setLoading(true);
    try {
      const client = new Client();
      const planetsArr: PlanetProps[] = searchQuery
        ? await client.search(searchQuery)
        : await client.getData();
      setPlanets(planetsArr);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setShowError(true);
      setErr(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const isSavedSearchExists = localStorage.getItem('savedSearch') !== null;
      isSavedSearchExists
        ? await loadPlanets(JSON.parse(localStorage.savedSearch))
        : await loadPlanets();
    };
    fetchData();
  }, []);

  const handleSearch = async (searchQuery: string) => {
    loadPlanets(searchQuery);
  };

  const handleTestError = () => {
    setShowError(true);
  };

  return (
    <main className="mainWrapper">
      <div className="titleWrapper">
        <div style={{ width: '150px' }}></div>
        <h1 className="mainTitle">Star Wars Planets</h1>
        <button
          className="errorBtn"
          onClick={() => {
            return handleTestError();
          }}
        >
          Test error
        </button>
      </div>
      <Search onSearch={handleSearch} />
      {loading ? (
        <div className={`loading`}>Loading...</div>
      ) : showError ? (
        <ErrorComponent err={err} />
      ) : (
        <Data planets={planets} />
      )}
    </main>
  );
}

export default App;
