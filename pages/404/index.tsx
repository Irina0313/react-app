import { useRouter } from 'next/router';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <>
      <h1 className={styles.notFoundPageTitle}>Page was not found</h1>
      <button className={styles.notFoundPageBtn} onClick={handleClick}>
        Return to the Main Page
      </button>
    </>
  );
}

export default NotFoundPage;
