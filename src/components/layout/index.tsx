import { NavLink, Outlet } from 'react-router-dom';
import styles from './layout.module.css';

const Layout = () => {
  return (
    <>
      <header>
        <nav id="sidebar" className={styles.navContainer}>
          <NavLink to="/">Main page</NavLink>
          <NavLink to="/uncontrolledForm" end>
            Uncontrolled form
          </NavLink>
          <NavLink to="/controlledForm" end>
            Controlled form
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
