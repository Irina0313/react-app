import Planet from './Planet';
import './Data.css';
import { PlanetProps } from './Planet';

interface DataProps {
  planets: PlanetProps[];
}

function Data(props: DataProps) {
  const planets = props.planets;
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

export default Data;
