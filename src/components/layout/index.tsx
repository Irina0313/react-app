import { NavLink, Outlet } from 'react-router-dom';
import styles from './layout.module.css';

const Layout = () => {
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <nav id="sidebar" className={styles.navContainer}>
          <NavLink to="/" className={styles.navLink}>
            Home page
          </NavLink>
          <NavLink to="/uncontrolledForm" className={styles.navLink} end>
            Uncontrolled form
          </NavLink>
          <NavLink to="/controlledForm" className={styles.navLink} end>
            Controlled form
          </NavLink>
        </nav>
      </header>
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
