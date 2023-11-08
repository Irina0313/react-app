import { useContext } from 'react';
import './Data.css';
import Product from './Product';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../context/context';

function Data() {
  const products = useContext(ProductsContext)?.products;

  return (
    <section className="dataWrapper">
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
