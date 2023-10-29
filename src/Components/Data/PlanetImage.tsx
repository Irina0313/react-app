import { useState } from 'react';
import './PlanetImage.css';

interface PlanetImageProps {
  planetName: string;
}

function PlanetImage(props: PlanetImageProps) {
  const planetName: string = props.planetName;
  const [imageError, setImageError] = useState(false);
  const src: string = `./planets/${planetName}.jpg`;
  const noImagesrc: string = './no-image-png-2.png';

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <img
      src={imageError ? noImagesrc : src}
      alt={planetName}
      className="planetImage"
      onError={handleImageError}
    />
  );
}

export default PlanetImage;
