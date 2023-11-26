import { useRouter } from 'next/router';
import {
  IApiResp,
  ProductProps,
  getProductById,
  getProducts,
  getRunningQueriesThunk,
} from '@/lib/productsApi';
import Layout from '@/components/layout';
import { wrapper } from '@/lib/store';

import Data from '@/components/data';
import ProductPage from '@/components/productPage';
import Search from '@/components/search';
import Pagination from '@/components/pagination';
import NotFoundPage from './404';

export interface MainPageProps {
  data: IApiResp | null;
  product: ProductProps | null;
}

const MainPage = ({ ...props }: MainPageProps) => {
  const router = useRouter();
  const { data, product } = props;

  return (
    <>
      {data && data.skip < data.total ? (
        <Layout>
          <Search />
          <Pagination {...data} />
          <Data data={data} />
          {router.query.product && <ProductPage product={product} />}
        </Layout>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default MainPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const query = context.query;
    const isQueryEmpty = Object.keys(query).length === 0;

    if (isQueryEmpty) {
      return {
        redirect: {
          destination: `/?items=30&page=1`,
          permanent: false,
        },
      };
    }

    const allowedKeys = ['items', 'search', 'page', 'product'];

    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(([key]) => allowedKeys.includes(key))
    );

    if (Object.keys(filteredQuery).length !== Object.keys(query).length) {
      return {
        props: {
          data: null,
          product: null,
        },
      };
    }

    const searchRequest = Array.isArray(context.query.search)
      ? context.query.search.join(',')
      : context.query.search;

    const itemsPerPage = Number(context.query.items);
    const page = Number(context.query.page);
    const productId = Number(context.query.product) || null;

    const productsResp = await store.dispatch(
      getProducts.initiate({
        searchRequest: searchRequest || null,
        itemsPerPage: itemsPerPage,
        currPageNumber: page,
      })
    );

    const productResp =
      productId &&
      (await store.dispatch(
        getProductById.initiate({
          productId: productId,
        })
      ));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    const data = productsResp.data;
    const product = productResp && productResp.data;

    return {
      props: {
        data: data,
        product: product ? product : null,
      },
    };
  }
);
