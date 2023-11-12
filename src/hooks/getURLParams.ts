import { useParams } from 'react-router-dom';

function useGetURLParams() {
  const { page, productId } = useParams();
  const pageNumber = page?.slice(5);
  const id = Number(productId?.slice(10));

  return { pageNumber: pageNumber, id: id };
}

export default useGetURLParams;
