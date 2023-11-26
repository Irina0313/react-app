import { useRouter } from 'next/router';
import { IApiResp } from '@/lib/productsApi';
import styles from './Pagination.module.css';

interface ICurrQuery {
  [x: string]: string | string[] | undefined;
}

function Pagination({ ...data }: IApiResp) {
  const router = useRouter();
  const { items, page } = router.query;

  const totalProducts = Number(data?.total);
  const lastPageNum = totalProducts && Math.ceil(totalProducts / Number(items));

  const getRedirect = (currentQuery: ICurrQuery) => {
    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  const handleClick = (btn: string) => {
    if (btn === 'prev' && Number(page) > 1) {
      const currentQuery = { ...router.query };
      currentQuery.page = String(Number(page) - 1);
      getRedirect(currentQuery);
    } else if (btn === 'next') {
      const currentQuery = { ...router.query };
      currentQuery.page = String(Number(page) + 1);
      getRedirect(currentQuery);
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue: string = event.target.value;
    const currentQuery = { ...router.query };
    currentQuery.page = '1';
    currentQuery.items = selectedValue;
    getRedirect(currentQuery);
  };

  return (
    <div data-testid="paginationComponent" className={styles.paginationBtn}>
      <button
        className={`${styles.arrowBtn} ${styles.prevPageArrowBtn}`}
        onClick={() => handleClick('prev')}
        disabled={Number(page) === 1}
      >
        prev
      </button>
      <div data-testid="currPageNumber" className={styles.currPageNumber}>
        {`${page}`}
      </div>
      <button
        className={`${styles.arrowBtn} ${styles.nextPageArrowBtn}`}
        onClick={() => handleClick('next')}
        disabled={lastPageNum === Number(page)}
      >
        next
      </button>
      <select
        className={styles.cardsQuantity}
        name="cardsQuantity"
        defaultValue={`${items}`}
        onChange={handleOptionChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select>
    </div>
  );
}
export default Pagination;
