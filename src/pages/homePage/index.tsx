import { useAppSelector } from '../../hooks/reduxHooks';
import styles from './homePage.module.css';

const HomePage = () => {
  const data = useAppSelector((state) => state.formData);
  return (
    <>
      <h1 className={styles.title}>Home Page</h1>
      <div>
        <h2 className={styles.title}>Forms Results</h2>
        <div className={styles.cardsContainer}>
          {data.map((res, index) => (
            <div
              className={`${styles.card} ${index === 0 && styles.lastCard}`}
              key={index}
            >
              {Object.entries(res).map(([key, value]) => (
                <div key={key}>
                  {key === 'picture' && value ? (
                    <div className={styles.picture}>
                      <img width={100} src={`${value}`} alt="picture" />
                    </div>
                  ) : (
                    <>
                      <span className={styles.dataItemTitle}>
                        {`${key[0].toLocaleUpperCase()}${key.slice(1)}`} :{' '}
                      </span>
                      <span className={styles.dataItem}>{String(value)};</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
