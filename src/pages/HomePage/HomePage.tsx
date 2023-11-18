import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Search from '../../Components/Search/Search';
import Pagination from '../../Components/Pagination/Pagination';
import Data from '../../Components/Data/Data';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useGetProductsQuery } from '../../store/productsAPI';
import useGetCurrentStateParams from '../../hooks/getCurrentStateParams';
import useGetURLParams from '../../hooks/getURLParams';
import { updateHomePageLoadingFlag } from '../../store/loadingStateSlice';
import { useAppDispatch } from '../../hooks/reduxsHooks';
import './HomePage.css';

function HomePage() {
  const dispatch = useAppDispatch();
  const { pageNumber } = useGetURLParams();
  const { itemsPerPage, searchRequest } = useGetCurrentStateParams();

  const { data, isFetching, isLoading, isError } = useGetProductsQuery({
    currPageNumber: pageNumber,
    itemsPerPage: itemsPerPage,
    searchRequest: searchRequest,
  });

  useEffect(() => {
    dispatch(updateHomePageLoadingFlag(isLoading));
  }, [dispatch, isLoading]);

  return (
    <>
      <main className="mainWrapper">
        <Search />
        {(isError || pageNumber === 0 || data?.products.length === 0) && (
          <NotFoundPage />
        )}
        {!isError && data && data?.products.length > 0 && <Pagination />}
        {isFetching && <div className="loading">Loading...</div>}
        {!isFetching && !isError && <Data data={data} />}
      </main>

      {<Outlet />}
    </>
  );
}

export default HomePage;
