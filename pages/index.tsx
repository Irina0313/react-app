import { IApiResp, ProductProps, getProductById } from '@/lib/productsApi';
import Layout from '@/components/layout';
import { wrapper } from '@/lib/store';
import { getProducts, getRunningQueriesThunk } from '@/lib/productsApi';
import Data from '@/components/data';
import ProductPage from '@/components/productPage';
import Search from '@/components/search';
import Pagination from '@/components/pagination';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const searchRequest = Array.isArray(context.query.search)
      ? context.query.search.join(',')
      : context.query.search || store.getState().search.searchRequest;

    const itemsPerPageFromStore =
      store.getState().paginationParams.itemsPerPage;
    const itemsPerPage = Number(context.query.items) || itemsPerPageFromStore;
    const currPageFromStore = store.getState().paginationParams.currPageNum;
    const page = Number(context.query.page) || currPageFromStore;
    const productId = Number(context.query.product) || null;

    const productsResp = await store.dispatch(
      getProducts.initiate({
        searchRequest: searchRequest,
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

    const query = context.query;
    const shouldRedirect = !query.page && data?.skip === 0;

    if (shouldRedirect) {
      return {
        redirect: {
          destination: `/?items=${itemsPerPage}&page=${page}`,
          permanent: false,
        },
      };
    }

    return {
      props: {
        data: data,
        product: product ? product : null,
        searchRequest: searchRequest,
        currPageNum: page,
        itemsPerPage: itemsPerPage,
      },
    };
  }
);

interface MainPageProps {
  data: IApiResp;
  product?: ProductProps;
  searchRequest: string;
  currPageNum: number;
  itemsPerPage: number;
}

const MainPage = ({ ...props }: MainPageProps) => {
  const { searchRequest, data, product, currPageNum, itemsPerPage } = props;

  const paginationProps = {
    data: data,
    currPageNum: currPageNum,
    itemsPerPage: itemsPerPage,
  };

  return (
    <Layout>
      <Search searchRequest={searchRequest} />
      <Pagination {...paginationProps} />
      <Data data={data} />
      {product && <ProductPage product={product} />}
    </Layout>
  );
};

export default MainPage;
