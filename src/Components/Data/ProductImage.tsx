import { useState } from 'react';
import './ProductImage.css';

interface ProductImageProps {
  productImgURL: string;
  isModalImage?: boolean;
}

function ProductImage(props: ProductImageProps) {
  const src: string = props.productImgURL;
  const [imageError, setImageError] = useState(false);

  const noImagesrc: string = './no-image-png-2.png';

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <img
      src={imageError ? noImagesrc : src}
      alt="product image"
      className={`${props.isModalImage ? 'modalImage' : 'productImage'}`}
      onError={handleImageError}
    />
  );
}

export default ProductImage;
