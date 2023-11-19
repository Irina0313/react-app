import { useState } from 'react';
import './ProductImage.css';

interface ProductImageProps {
  url: string | undefined;
  isModalImage?: boolean;
}

function ProductImage(props: ProductImageProps) {
  const { url, isModalImage } = props;

  const [imageError, setImageError] = useState(false);
  const noImagesrc: string = './no-image-png-2.png';

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <img
      src={imageError ? noImagesrc : url}
      alt="product image"
      className={`${isModalImage ? 'modalImage' : 'productImage'}`}
      onError={handleImageError}
      data-testid={'productImage'}
    />
  );
}

export default ProductImage;
