import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetURLParams from '../../hooks/getURLParams';
import './ProductPage.css';
import ProductImage from '../../Components/Data/ProductImage';
import { LoadingContext, ProductsContext } from '../../context';

interface ProductPageProps {
  getProducts: () => void;
}

function ProductPage(props: ProductPageProps) {
  const products = useContext(ProductsContext)?.products;
  const loading = useContext(LoadingContext);

  const { getProducts } = props;

  const navigate = useNavigate();
  const { pageNumber, id } = useGetURLParams();
  const product = products?.filter((product) => Number(product.id) === id)[0];

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

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

  useEffect(() => {
    id && setIsModalOpen(true);
    if (!isDataLoaded) {
      setIsDataLoaded(true);
      getProducts();
    }
  }, [id, getProducts, isDataLoaded]);

  return isModalOpen ? (
    <div
      data-testid="modalBackdrop"
      className={`modalBackdrop ${isModalOpen && 'open'}`}
      onClick={handleModalClick}
    >
      <div className="modalContent">
        {loading && (
          <div className="loading" data-testid="productPageLoader">
            Loading...
          </div>
        )}
        {!loading && !product && <h2> Sorry... Nothing was found </h2>}
        {!loading && product && (
          <>
            <h2 className="modalTitle">{product.title}</h2>
            <div className="modalImageContainer">
              <ProductImage id={product?.id} isModalImage={true} />
            </div>
            <h3>{`Category: ${product.category}`}</h3>
            <p className="modalDescription">{product.description}</p>
            <h3 className="modalPrice">{`Price: ${product.price}$`}</h3>
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
