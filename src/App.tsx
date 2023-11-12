import { useState, useCallback, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProductPage from './pages/ProductPage/ProductPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Layout from './Components/Layout/Layout';
import client from './api/Client';
import './Components/Layout/Layout.css';
import HomePage from './pages/HomePage/HomePage';
import { IApiResp } from './api/Client';
import { ProductsContext, LoadingContext, SearchContext } from './context';
import safeJsonParse from './utils/JsonActions';

function App() {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const [data, setData] = useState<IApiResp | null>(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [searchParams, setSearchParams] = useState<string | null>(() =>
    safeJsonParse(localStorage.savedSearch)
  );
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(30);

  const segments = pathname.split('/');
  const [currPageNum, setCurrPageNum] = useState(
    (segments[1].length > 5 &&
      (() => {
        return Number(segments[1].slice(5));
      })) ||
      null
  );

  const loadProducts = useCallback(
    async (
      searchQuery: string | null = searchParams,
      items: number = itemsPerPage,
      currPageNum: number | null
    ) => {
      if (currPageNum) {
        try {
          setLoading(true);

          const data = await client(
            'products',
            searchQuery,
            items,
            currPageNum
          );
          setLoading(false);

          data && setData(data);
        } catch (error) {
          console.error('catch ', error);
          setLoading(false);
          setShowError(true);
        }
      } else {
        setLoading(false);
        setShowError(true);
      }
    },
    [itemsPerPage, searchParams]
  );

  useEffect(() => {
    if (!isDataLoaded) {
      (async () => {
        setIsDataLoaded(true);
        if (segments[1] === '') {
          navigate(`page=1`);
          setCurrPageNum(1);
          await loadProducts(searchParams, itemsPerPage, 1);
        } else {
          navigate(`${pathname}`);
          await loadProducts(searchParams, itemsPerPage, currPageNum);
        }
      })();
    }
  }, [
    searchParams,
    loadProducts,
    isDataLoaded,
    itemsPerPage,
    navigate,
    pathname,
    segments,
    currPageNum,
  ]);

  const handleSearch = async (searchQuery: string | null) => {
    setShowError(false);
    setLoading(true);

    localStorage.setItem('savedSearch', JSON.stringify(searchQuery));
    setSearchParams(searchQuery);
    await loadProducts(searchQuery, itemsPerPage, 1);
  };

  const handleTestError = () => {
    setShowError(true);
  };

  const handlePaginatorBtnsClick = async (
    pageNumber: number,
    items: number = 30
  ) => {
    setLoading(true);

    setItemsPerPage(items);
    setCurrPageNum(pageNumber);
    await loadProducts(searchParams, items, pageNumber);
  };

  const updateProducts = async () => {
    await loadProducts(searchParams, itemsPerPage, currPageNum);
  };

  return (
    <LoadingContext.Provider value={loading}>
      <SearchContext.Provider
        value={{ onSearch: handleSearch, prevSearchParams: searchParams }}
      >
        <ProductsContext.Provider value={data}>
          <Routes>
            <Route
              path={`/`}
              element={<Layout handleTestError={handleTestError} />}
            >
              <Route
                path={':page'}
                element={
                  <HomePage
                    showError={showError}
                    handlePaginatorBtnsClick={handlePaginatorBtnsClick}
                  />
                }
              >
                <Route
                  path={':productId'}
                  element={<ProductPage getProducts={updateProducts} />}
                />
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ProductsContext.Provider>
      </SearchContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
