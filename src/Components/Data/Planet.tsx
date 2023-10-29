import { Component } from 'react';
import PlanetImage from './PlanetImage';
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
    const { name, climate, gravity, diameter, population, terrain } =
      this.props;

    const planetDescriptionItems = [
      { label: 'Climate', value: climate },
      { label: 'Gravity', value: gravity },
      { label: 'Diameter', value: diameter },
      { label: 'Population', value: population },
      { label: 'Terrain', value: terrain },
    ];

    return (
      <div className="planetWrapper">
        <div className="planetImageContainer">
          <PlanetImage planetName={name} />
        </div>
        <h2 className="planetName">{name}</h2>
        <div className="planetDescription">
          {planetDescriptionItems.map((item, index) => (
            <p key={index} className="planetDescriptionItem">
              {item.label}: {item.value}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default Planet;
