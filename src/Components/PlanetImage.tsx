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

  handleImageError = () => {
    this.setState({ imageError: true });
  };

  render() {
    return this.state.imageError ? null : (
      <img
        src={this.src}
        alt={this.props.planetName}
        className="planetImage"
        onError={this.handleImageError}
      />
    );
  }
}

export default PlanetImage;
