import './Data.css';
import Product from './Product';
import { ProductsProps } from './Product';

interface DataProps {
  products: ProductsProps[];
}

function Data(props: DataProps) {
  const products = props.products;
  console.log(products);
  return (
    <section className="productsWrapper">
      {products.length > 0 ? (
        products.map((product) => <Product key={product.id} {...product} />)
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
