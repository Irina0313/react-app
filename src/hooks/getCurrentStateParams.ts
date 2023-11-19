import { useAppSelector } from './reduxsHooks';

const useGetCurrentStateParams = () => {
  const itemsPerPage: number = useAppSelector(
    (state) => state.itemsPerPage.itemsPerPage
  );
  const searchRequest = useAppSelector(
    (state) => state.searchRequest.searchRequest
  );

  return { itemsPerPage: itemsPerPage, searchRequest: searchRequest };
};

export default useGetCurrentStateParams;
