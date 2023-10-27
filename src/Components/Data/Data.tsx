import { Component } from 'react';
import Planet from './Planet';
import './Data.css';
import { PlanetProps } from './Planet';

interface DataProps {
  planets: PlanetProps[];
}

class Data extends Component<DataProps> {
  constructor(props: DataProps) {
    super(props);
  }

  render() {
    return (
      <section className="planetsWrapper">
        {this.props.planets.map((planet) => (
          <Planet key={planet.name} {...planet} />
        ))}
      </section>
    );
  }
}

export default Data;
