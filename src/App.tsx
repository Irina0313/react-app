import { useState, useEffect, useCallback } from 'react';
import Search from './Components/Search/Search';
import Data from './Components/Data/Data';
import './App.css';
import Client from './api/Client';
import { ProductsProps } from './Components/Data/Product';
import ErrorComponent from './Components/ErrorBoundary/ErrorComponent';

function App() {
  const safeJsonParse = (s: string) => {
    try {
      return JSON.parse(s);
    } catch (e) {
      return null;
    }
  };

  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [err, setErr] = useState<Error | null | unknown>(null);
  const [searchParams, setSearchParams] = useState<string | null>(
    safeJsonParse(localStorage.savedSearch)
  );
  const { getData, search } = Client();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const loadProducts = useCallback(
    async (searchQuery: string | null = null) => {
      setLoading(true);

      try {
        const data: ProductsProps[] = searchQuery
          ? await search(searchQuery)
          : await getData();
        console.log(data);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setShowError(true);
        setErr(error);
      }
    },
    [getData, search]
  );

  useEffect(() => {
    if (!isDataLoaded) {
      (async () => {
        setIsDataLoaded(true);
        await loadProducts(searchParams);
      })();
    }
  }, [searchParams, loadProducts, isDataLoaded]);

  const handleSearch = (searchQuery: string | null) => {
    localStorage.savedSearch = JSON.stringify(searchQuery);
    setSearchParams(searchQuery);
    loadProducts(searchQuery);
  };

  const handleTestError = () => {
    setShowError(true);
  };

  return (
    <main className="mainWrapper">
      <div className="titleWrapper">
        <div style={{ width: '150px' }}></div>
        <h1 className="mainTitle">RSS React App Catalog</h1>
        <button className="errorBtn" onClick={handleTestError}>
          Test error
        </button>
      </div>
      <Search onSearch={handleSearch} prevSearchParams={searchParams} />
      {loading && <div className={`loading`}>Loading...</div>}
      {showError && <ErrorComponent err={err} />}
      {!loading && !showError && <Data products={products} />}
    </main>
  );
}

export default App;
