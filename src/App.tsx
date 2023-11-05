import { useState, useCallback, useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Layout from './Components/Layout';
import { ProductProps } from './Components/Data/Product';
import client from './api/Client';
import Search from './Components/Search/Search';
import ErrorComponent from './Components/ErrorBoundary/ErrorComponent';
import Pagination from './Components/Pagination/Pagination';
import Data from './Components/Data/Data';
import './Components/Layout.css';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';

export interface MainWrapperProps {
  loading: boolean;
  showError: boolean;
  err: Error | null | unknown;
  totalProducts: number;
  products: ProductProps[];
  handleTestError: () => void;
  handleSearch: (searchQuery: string | null) => void;
  searchParams: string | null;
  currPageNumber: number;
  onPaginatorBtnsClick: (btn: string) => void;
}

function App() {
  const safeJsonParse = (s: string) => {
    try {
      return JSON.parse(s);
    } catch (e) {
      return null;
    }
  };

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const segments = pathname.split('/');

  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [err, setErr] = useState<Error | null | unknown>(null);
  const [searchParams, setSearchParams] = useState<string | null>(
    safeJsonParse(localStorage.savedSearch)
  );
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [totalProducts, setTotaProducts] = useState(0);
  const [currPageNum, setCurrPageNum] = useState(Number(segments[2]) || 1);

  if (
    (segments.length >= 6 && segments[5] !== '') ||
    (segments.length === 5 && segments[4] === '') ||
    (segments.length === 4 && segments[3] !== 'productId')
  ) {
    setShowError(true);
  }

  const loadProducts = useCallback(
    async (
      searchQuery: string | null = searchParams,
      items: number = itemsPerPage,
      currPageNum: number
    ) => {
      setLoading(true);

      try {
        client('products', searchQuery, items, currPageNum).then((data) => {
          setProducts(data.products);
          setTotaProducts(data.total);
          setLoading(false);
        });
      } catch (error) {
        setLoading(false);
        setShowError(true);
        setErr(error);
      }
    },
    [itemsPerPage, searchParams]
  );

  console.log('showError', showError, isDataLoaded, 'kk');

  useEffect(() => {
    if (!isDataLoaded) {
      (async () => {
        setIsDataLoaded(true);
        const currPage = Number(segments[2]);
        setCurrPageNum(currPage);

        if (pathname.length === 1) {
          navigate(`page/1`);
          setCurrPageNum(1);
          await loadProducts(searchParams, itemsPerPage, 1);
        } else {
          navigate(`${pathname}`);
          await loadProducts(searchParams, itemsPerPage, currPage);
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
    setLoading(true);
    localStorage.savedSearch = JSON.stringify(searchQuery);
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

  const handleReload = () => {
    console.log('hh');
    navigate('/page/1');
    setShowError(false);
  };

  return (
    <ErrorBoundary handleReload={handleReload}>
      <>
        <Routes>
          <Route
            path={`/`}
            element={<Layout handleTestError={handleTestError} />}
          >
            <Route
              path={'page/:pageNumber/*'}
              element={
                <>
                  <main className="mainWrapper">
                    <Search
                      onSearch={handleSearch}
                      prevSearchParams={searchParams}
                    />

                    {showError && <ErrorComponent err={err} />}
                    {!showError && (
                      <Pagination
                        onPaginatorBtnsClick={handlePaginatorBtnsClick}
                        totalProducts={totalProducts}
                        loading={loading}
                      />
                    )}
                    {loading && <div className="loading">Loading...</div>}
                    {!loading && !showError && (
                      <Data products={products} currPageNum={currPageNum} />
                    )}
                  </main>
                  <Outlet />
                </>
              }
            >
              <Route
                path={'productId/:id'}
                element={
                  <ProductPage
                    products={products}
                    getProducts={updateProducts}
                    loading={loading}
                  />
                }
              />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    </ErrorBoundary>
  );
}

export default App;
