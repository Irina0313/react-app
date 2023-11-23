import { useRef, FormEvent } from 'react';
import styles from './Search.module.css';
import { useRouter } from 'next/router';

interface SearchParams {
  searchRequest: string;
}

function Search({ searchRequest }: SearchParams) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    const inputValue = inputRef.current?.value || '';
    const currentQuery = { ...router.query };
    currentQuery.search = inputValue;
    currentQuery.page = '1';

    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  return (
    <section>
      <form className={styles.searchWrapper} onSubmit={handleSearch}>
        <input
          ref={inputRef}
          className={styles.searchInput}
          defaultValue={searchRequest || ''}
          type="search"
        />
        <button
          type="submit"
          className={`${styles.button} ${styles.searchBtn}`}
        >
          Search
        </button>
      </form>
    </section>
  );
}

export default Search;
