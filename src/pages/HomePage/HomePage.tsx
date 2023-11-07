import { Outlet } from 'react-router-dom';
import Search from '../../Components/Search/Search';
import Pagination from '../../Components/Pagination/Pagination';
import Data from '../../Components/Data/Data';
import { IApiResp } from '../../api/Client';
import './HomePage.css';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

export interface HomePageProps {
  loading: boolean;
  showError: boolean;
  err: Error | null | unknown;
  data: IApiResp;

  handleSearch: (searchQuery: string | null) => void;
  searchParams: string | null;
  currPageNumber: number | null;
  handlePaginatorBtnsClick: (
    pageNumber: number,
    items?: number | undefined
  ) => void;
}

function HomePage(props: HomePageProps) {
  const {
    handleSearch,
    searchParams,
    showError,
    handlePaginatorBtnsClick,
    data,
    loading,
    currPageNumber,
  } = props;

  return (
    <>
      <main className="mainWrapper">
        <Search onSearch={handleSearch} prevSearchParams={searchParams} />
        {(showError || data.products.length === 0) && <NotFoundPage />}
        {!showError && data.products.length > 0 && (
          <Pagination
            onPaginatorBtnsClick={handlePaginatorBtnsClick}
            totalProducts={data.total}
            loading={loading}
          />
        )}
        {loading && <div className="loading">Loading...</div>}
        {!loading && !showError && (
          <Data products={data.products} currPageNum={currPageNumber} />
        )}
      </main>

      {<Outlet />}
    </>
  );
}

export default HomePage;
