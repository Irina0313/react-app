import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Data.css';
import Product from './Product';
import { ProductsContext } from '../../context';

function Data() {
  const products = useContext(ProductsContext)?.products;

  return (
    <section data-testid="dataSection" className="dataWrapper">
      <div className="productsWrapper">
        {products?.map((product) => (
          <Link
            to={`productId=${product.id}`}
            key={product.id}
            className="productWrapper"
          >
            <Product id={product.id} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Data;
