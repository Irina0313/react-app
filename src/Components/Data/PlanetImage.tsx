import { Component } from 'react';
import './PlanetImage.css';

interface PlanetImageProps {
  planetName: string;
}
interface PlanetImageState {
  imageError: boolean;
}
class PlanetImage extends Component<PlanetImageProps, PlanetImageState> {
  constructor(props: PlanetImageProps) {
    super(props);
    this.state = {
      imageError: false,
    };
  }
  private src: string = `./planets/${this.props.planetName}.jpg`;
  private noImagesrc: string = './no-image-png-2.png';

  handleImageError = () => {
    this.setState((prevState) => ({ imageError: !prevState.imageError }));
  };

  render() {
    return (
      <img
        src={this.state.imageError ? this.noImagesrc : this.src}
        alt={this.props.planetName}
        className="planetImage"
        onError={this.handleImageError}
      />
    );
  }
}

export default PlanetImage;
