import { useState, useContext } from 'react';
import './ProductImage.css';
import { ProductsContext } from '../../context/context';

interface ProductImageProps {
  id: number | undefined;
  isModalImage?: boolean;
}

function ProductImage(props: ProductImageProps) {
  const { id, isModalImage } = props;

  const product = useContext(ProductsContext)?.products.filter(
    (prod) => prod.id === id
  )[0];

  const src: string | undefined = product?.images[0];
  const [imageError, setImageError] = useState(false);
  const noImagesrc: string = './no-image-png-2.png';

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <img
      src={imageError ? noImagesrc : src}
      alt="product image"
      className={`${isModalImage ? 'modalImage' : 'productImage'}`}
      onError={handleImageError}
    />
  );
}

export default ProductImage;
