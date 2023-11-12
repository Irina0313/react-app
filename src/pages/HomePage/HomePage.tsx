import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import Search from '../../Components/Search/Search';
import Pagination from '../../Components/Pagination/Pagination';
import Data from '../../Components/Data/Data';
import { IApiResp } from '../../api/Client';
import './HomePage.css';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { LoadingContext, ProductsContext } from '../../context';

export interface HomePageProps {
  showError: boolean;
  handlePaginatorBtnsClick: (
    pageNumber: number,
    items?: number | undefined
  ) => void;
}

function HomePage(props: HomePageProps) {
  const { showError, handlePaginatorBtnsClick } = props;

  const data: IApiResp | null = useContext(ProductsContext);
  const loading = useContext(LoadingContext);

  return (
    <>
      <main className="mainWrapper">
        <Search />
        {(showError || data?.products.length === 0 || data === null) && (
          <NotFoundPage />
        )}
        {!showError && data && data.products.length > 0 && (
          <Pagination onPaginatorBtnsClick={handlePaginatorBtnsClick} />
        )}
        {loading && <div className="loading">Loading...</div>}
        {!loading && !showError && <Data />}
      </main>

      {<Outlet />}
    </>
  );
}

export default HomePage;
