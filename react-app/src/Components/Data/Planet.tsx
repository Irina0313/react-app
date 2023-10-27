import { Component } from 'react';
import './Planet.css';

export interface PlanetProps {
  name: string;
  climate: string;
  gravity: string;
  diameter: string;
  population: string;
  terrain: string;
}

class Planet extends Component<PlanetProps> {
  constructor(props: PlanetProps) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="planetWrapper">
          <h2 className="planetName">{this.props.name}</h2>
          <div className="planetDescription">
            <p className="planetDescriptionItem">
              Climate: {this.props.climate}
            </p>
            <p className="planetDescriptionItem">
              Gravity: {this.props.gravity}
            </p>
            <p className="planetDescriptionItem">
              Diameter: {this.props.diameter}
            </p>
            <p className="planetDescriptionItem">
              Population: {this.props.population}
            </p>
            <p className="planetDescriptionItem">
              Terrain: {this.props.terrain}
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Planet;
