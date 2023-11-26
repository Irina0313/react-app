import { useRouter } from 'next/router';
import { ProductProps } from '@/lib/productsApi';
import styles from './ProductPage.module.css';
import ProductImage from '../productImage';

interface ProductPageProps {
  product: ProductProps | null;
}

export default function ProductPage({ product }: ProductPageProps) {
  const router = useRouter();

  const handleCloseBtnClick = () => {
    const currentQuery = { ...router.query };
    delete currentQuery.product;
    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  return (
    <div
      data-testid="modalBackdrop"
      className={`${styles.modalBackdrop} ${styles.modalBackdropOpen}`}
      onClick={handleCloseBtnClick}
    >
      <div className={styles.modalContent}>
        {product === null && (
          <>
            <h2> Sorry... Nothing was found </h2>
            <button className="notFoundPageBtn" onClick={handleCloseBtnClick}>
              Close
            </button>
          </>
        )}
        {product !== null && (
          <>
            <h2 className={styles.modalTitle}>{product?.title}</h2>
            <div className={styles.modalImageContainer}>
              <ProductImage url={product?.images[0]} isModalImage={true} />
            </div>
            <h3>{`Category: ${product?.category}`}</h3>
            <p className={styles.modalDescription}>{product?.description}</p>
            <h3 className={styles.modalPrice}>{`Price: ${product?.price}$`}</h3>
            <button className={styles.modalBtn} onClick={handleCloseBtnClick}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
