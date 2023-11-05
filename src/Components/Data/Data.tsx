import './Data.css';
import Product from './Product';
import { ProductProps } from './Product';
import { Link } from 'react-router-dom';

interface DataProps {
  products: ProductProps[];
  currPageNum: number;
}

function Data(props: DataProps) {
  const products = props.products;
  const currPageNum = props.currPageNum;

  return (
    <section className="dataWrapper">
      <div className="productsWrapper">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              to={`/${currPageNum}/${product.id}`}
              key={product.id}
              className="productWrapper"
            >
              <Product {...product} />
            </Link>
          ))
        ) : (
          <h2 className="dataTitle">
            Sorry... Nothing found <br />
            Try looking for something else
          </h2>
        )}
      </div>
    </section>
  );
}

export default Data;
