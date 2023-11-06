import { useParams, useNavigate } from 'react-router-dom';
import './Pagination.css';
import { useState } from 'react';

interface PaginationProps {
  onPaginatorBtnsClick: (pageNumber: number, items?: number) => void;
  totalProducts: number;
  loading: boolean;
}

function Pagination(props: PaginationProps) {
  const { onPaginatorBtnsClick, totalProducts, loading } = props;
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(30);
  const lastPageNum = Math.ceil(totalProducts / selectedOption);

  const handleClick = (btn: string) => {
    if (btn === 'prev' && Number(pageNumber) > 1) {
      navigate(`/page/${Number(pageNumber) - 1}`);
      onPaginatorBtnsClick(Number(pageNumber) - 1, selectedOption);
    } else if (btn === 'next') {
      navigate(`/page/${Number(pageNumber) + 1}`);
      onPaginatorBtnsClick(Number(pageNumber) + 1, selectedOption);
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`/page/1`);
    const selectedValue: number = Number(event.target.value);
    setSelectedOption(selectedValue);
    onPaginatorBtnsClick(1, selectedValue);
  };

  return (
    <div className="paginationBtn">
      <button
        className="arrowBtn prevPageArrowBtn"
        onClick={() => handleClick('prev')}
        disabled={Number(pageNumber) === 1 || loading}
      >
        prev
      </button>
      <div className="currPageNumber">{pageNumber}</div>
      <button
        className="arrowBtn nextPageArrowBtn"
        onClick={() => handleClick('next')}
        disabled={lastPageNum === Number(pageNumber) || loading}
      >
        next
      </button>
      <select
        className="cardsQuantity"
        name="cardsQuantity"
        defaultValue={`${selectedOption}`}
        onChange={handleOptionChange}
        disabled={loading}
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
