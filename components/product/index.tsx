import { ProductProps } from '@/lib/productsApi';
import styles from './product.module.css';
import ProductImage from '../productImage';

function Product(props: ProductProps) {
  const { brand, category, price, title, images } = props;

  const productDescriptionItems = [
    { label: 'Brand', value: brand },
    { label: 'Category', value: category },
    { label: 'Price', value: price },
  ];

  return (
    <>
      <div className={styles.productImageContainer}>
        <ProductImage url={images[0]} />
      </div>
      <h2 className={styles.productName}>{title}</h2>
      <div className={styles.productDescription}>
        {productDescriptionItems.map((item) => (
          <p key={item.label} className={styles.productDescriptionItem}>
            {item.label}: {item.value}
          </p>
        ))}
      </div>
    </>
  );
}

export default Product;
