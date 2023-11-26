import Head from 'next/head';
import { useState } from 'react';
import styles from './layout.module.css';
import ErrorComponent from '../errorBoundary/ErrorComponent';
import { useRouter } from 'next/router';

interface layoutProps {
  children: React.ReactNode;
}

export const siteTitle = 'RSS next-app';

export default function Layout({ children }: layoutProps) {
  const [isTestError, setIsTestError] = useState(false);

  const router = useRouter();
  const productId = router.query.product;

  const handleTestError = () => {
    setIsTestError(true);
  };
  return (
    <div className={styles.container} data-testid="layout">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={siteTitle} />
        <meta name="og:title" content="next-app" />
      </Head>

      <div
        className={`${styles.mainContainer} ${
          productId ? styles.modalOpened : ''
        }`}
      >
        <header className={styles.header}>
          <div className={styles.titleWrapper}>
            <div style={{ width: '150px' }} />
            <h1 className={styles.mainTitle}>RSS React App Catalog</h1>
            <button className={styles.errorBtn} onClick={handleTestError}>
              Test error
            </button>
          </div>
        </header>
        {isTestError && <ErrorComponent err={null} />}
        <main>{children}</main>
      </div>
    </div>
  );
}
