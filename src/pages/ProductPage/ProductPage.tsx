import { useEffect, useState } from 'react';
import { ProductProps } from '../../Components/Data/Product';
import { useNavigate } from 'react-router-dom';
import useGetURLParams from '../../hooks/getURLParams';
import './ProductPage.css';
import ProductImage from '../../Components/Data/ProductImage';

interface ProductPageProps {
  products: ProductProps[];
  getProducts: () => void;
  loading: boolean;
}

function ProductPage(props: ProductPageProps) {
  const { products, getProducts, loading } = props;
  const navigate = useNavigate();
  const { pageNumber, id } = useGetURLParams();
  const product = products.filter((product) => Number(product.id) === id)[0];

  console.log(product);
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

  return (
    <div
      className={`modalBackdrop ${isModalOpen ? 'open' : 'closed'}`}
      onClick={handleModalClick}
    >
      <div className="modalContent">
        {loading && <div className="loading">Loading...</div>}
        {!loading && !product && <h2> Sorry... Nothing was found </h2>}
        {!loading && product && (
          <>
            <h2 className="modalTitle">{product.title}</h2>
            <div className="modalImageContainer">
              <ProductImage
                productImgURL={product.images[0]}
                isModalImage={true}
              />
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
  );
}

export default ProductPage;
