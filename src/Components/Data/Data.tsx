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

  return (
    <section className="dataWrapper">
      <div className="productsWrapper">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              to={`productId/${product.id}`}
              key={product.id}
              className="productWrapper"
            >
              <Product {...product} />
            </Link>
          ))
        ) : (
          <>
            <h2 className="dataTitle">Sorry... Nothing found</h2>
            <button
              className="returnToMainPageBtn"
              onClick={() => {
                window.location.replace('/page/1');
              }}
            >
              Return to the First Page
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default Data;
