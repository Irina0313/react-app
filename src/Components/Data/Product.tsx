import './Product.css';
import ProductImage from './ProductImage';

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

function Product(props: ProductProps) {
  const { title, brand, category, price, images } = props;

  const productDescriptionItems = [
    { label: 'Brand', value: brand },
    { label: 'Category', value: category },
    { label: 'Price', value: price },
  ];

  return (
    <>
      <div className="productImageContainer">
        <ProductImage productImgURL={images[0]} />
      </div>
      <h2 className="productName">{title}</h2>
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
