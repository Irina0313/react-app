import { useContext } from 'react';
import './Product.css';
import ProductImage from './ProductImage';
import { ProductsContext } from '../../context';

export interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

function Product(props: Partial<ProductProps>) {
  const { id } = props;

  const product = useContext(ProductsContext)?.products.filter(
    (prod) => prod.id === id
  )[0];

  const productDescriptionItems = [
    { label: 'Brand', value: product?.brand },
    { label: 'Category', value: product?.category },
    { label: 'Price', value: product?.price },
  ];

  return (
    <>
      <div className="productImageContainer">
        <ProductImage id={id} />
      </div>
      <h2 className="productName">{product?.title}</h2>
      <div className="productDescription">
        {productDescriptionItems.map((item) => (
          <p key={item.label} className="productDescriptionItem">
            {item.label}: {item.value}
          </p>
        ))}
      </div>
    </>
  );
}

export default Product;
