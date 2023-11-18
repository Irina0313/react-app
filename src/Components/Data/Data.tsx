import { Link } from 'react-router-dom';
import './Data.css';
import Product from './Product';
import { IApiResp } from '../../store/productsAPI';
interface IDataProps {
  data: IApiResp | undefined;
}

function Data(props: IDataProps) {
  const { data } = props;
  const products = data?.products;

  return (
    <section data-testid="dataSection" className="dataWrapper">
      <div className="productsWrapper">
        {products?.map((product) => (
          <Link
            to={`productId=${product.id}`}
            key={product.id}
            className="productWrapper"
          >
            <Product {...product} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Data;
