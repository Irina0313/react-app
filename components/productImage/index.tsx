import Image from 'next/image';
import styles from './productImage.module.css';

interface ProductImageProps {
  url: string | undefined;
  isModalImage?: boolean;
}

function ProductImage(props: ProductImageProps) {
  const { url, isModalImage } = props;

  const noImagesrc: string = '/no-image-png-2.png';

  return (
    <Image
      src={url || noImagesrc}
      alt="product image"
      width={isModalImage ? 200 : 100}
      height={isModalImage ? 200 : 100}
      className={`${isModalImage && styles.modalImage} ${
        !isModalImage && styles.productImage
      } `}
      data-testid={'productImage'}
    />
  );
}

export default ProductImage;
