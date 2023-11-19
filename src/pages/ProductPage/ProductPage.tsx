import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxsHooks';
import useGetURLParams from '../../hooks/getURLParams';
import ProductImage from '../../Components/Data/ProductImage';
import { updateProductPageLoadingFlag } from '../../store/loadingStateSlice';
import { useGetProductByIdQuery } from '../../store/productsAPI';
import './ProductPage.css';

function ProductPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pageNumber, id } = useGetURLParams();

  const { data, isFetching, isLoading } = useGetProductByIdQuery({
    productId: id,
  });

  useEffect(() => {
    dispatch(updateProductPageLoadingFlag(isLoading));
  }, [dispatch, isLoading]);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement) {
      const divElement = e.target;
      if (divElement.classList.contains('modalBackdrop')) {
        setIsModalOpen(false);
        navigate(`/page=${pageNumber}`);
      }
    }
  };

  const handleCloseBtnClick = () => {
    setIsModalOpen(false);
    navigate(`/page=${pageNumber}`);
  };

  return isModalOpen ? (
    <div
      data-testid="modalBackdrop"
      className={`modalBackdrop ${isModalOpen && 'open'}`}
      onClick={handleModalClick}
    >
      <div className="modalContent">
        {isFetching && (
          <div className="loading" data-testid="productPageLoader">
            Loading...
          </div>
        )}
        {!isFetching && !data && (
          <>
            <h2> Sorry... Nothing was found </h2>
            <button className="notFoundPageBtn" onClick={handleCloseBtnClick}>
              Close
            </button>
          </>
        )}
        {!isFetching && data && (
          <>
            <h2 className="modalTitle">{data?.title}</h2>
            <div className="modalImageContainer">
              <ProductImage url={data?.images[0]} isModalImage={true} />
            </div>
            <h3>{`Category: ${data?.category}`}</h3>
            <p className="modalDescription">{data?.description}</p>
            <h3 className="modalPrice">{`Price: ${data?.price}$`}</h3>
            <button className="modalBtn" onClick={handleCloseBtnClick}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  ) : null;
}

export default ProductPage;
