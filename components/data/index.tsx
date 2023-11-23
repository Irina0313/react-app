import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Data.module.css';
import Product from '../product';
import { IApiResp } from '@/lib/productsApi';

interface IDataProps {
  data: IApiResp | undefined;
}

function Data(props: IDataProps) {
  const router = useRouter();
  const pageNum = router.query.page;
  const products = props.data?.products;

  return (
    <section data-testid="dataSection" className={styles.dataWrapper}>
      <div className={styles.productsWrapper}>
        {products?.map((product) => (
          <Link
            href={{
              pathname: '/',
              query: {
                ...router.query,
                page: pageNum,
                product: product.id,
              },
            }}
            key={product.id}
            className={styles.productWrapper}
          >
            <Product {...product} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Data;
