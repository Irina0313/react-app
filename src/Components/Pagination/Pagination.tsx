import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetURLParams from '../../hooks/getURLParams';
import useGetCurrentStateParams from '../../hooks/getCurrentStateParams';
import { changeItemsPerPage } from '../../store/paginationSlice';
import { useAppDispatch } from '../../hooks/reduxsHooks';
import { useGetProductsQuery } from '../../store/productsAPI';
import './Pagination.css';

function Pagination() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const pageNumber = Number(useGetURLParams().pageNumber);
  const [currPageNum, setCurrPageNum] = useState(pageNumber || 1);
  const { itemsPerPage, searchRequest } = useGetCurrentStateParams();

  const { data, isFetching } = useGetProductsQuery({
    currPageNumber: currPageNum,
    itemsPerPage: itemsPerPage,
    searchRequest: searchRequest,
  });

  const totalProducts = Number(data?.total);
  const lastPageNum = totalProducts && Math.ceil(totalProducts / itemsPerPage);

  const handleClick = (btn: string) => {
    if (btn === 'prev' && currPageNum > 1) {
      navigate(`/page=${currPageNum - 1}`);
      setCurrPageNum(currPageNum - 1);
    } else if (btn === 'next') {
      navigate(`/page=${currPageNum + 1}`);
      setCurrPageNum(currPageNum + 1);
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`/page=1`);
    const selectedValue: number = Number(event.target.value);
    setCurrPageNum(1);
    dispatch(changeItemsPerPage(selectedValue));
  };

  return (
    <div data-testid="paginationComponent" className="paginationBtn">
      <button
        className="arrowBtn prevPageArrowBtn"
        onClick={() => handleClick('prev')}
        disabled={currPageNum === 1 || isFetching}
      >
        prev
      </button>
      <div data-testid="currPageNumber" className="currPageNumber">
        {pageNumber || currPageNum}
      </div>
      <button
        className="arrowBtn nextPageArrowBtn"
        onClick={() => handleClick('next')}
        disabled={lastPageNum === currPageNum || isFetching}
      >
        next
      </button>
      <select
        className="cardsQuantity"
        name="cardsQuantity"
        defaultValue={`${itemsPerPage}`}
        onChange={handleOptionChange}
        disabled={isFetching}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select>
    </div>
  );
}
export default Pagination;
