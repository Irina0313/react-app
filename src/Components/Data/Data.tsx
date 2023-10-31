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
    const { planets } = this.props;
    return (
      <section className="planetsWrapper">
        {planets.length > 0 ? (
          planets.map((planet) => <Planet key={planet.name} {...planet} />)
        ) : (
          <h2 className="dataTitle">
            Sorry... Nothing found <br />
            Try looking for something else
          </h2>
        )}
      </section>
    );
  }
}

export default Data;
