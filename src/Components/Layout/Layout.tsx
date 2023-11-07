import { Outlet } from 'react-router-dom';
import useGetURLParams from '../../hooks/getURLParams';
import './Layout.css';

export interface LayoutProps {
  handleTestError: () => void;
}

function Layout(props: LayoutProps) {
  const { handleTestError } = props;
  const { id } = useGetURLParams();

  return (
    <div className={`mainContainer ${id && 'modalOpened'}`}>
      <header className="header ">
        <div className="titleWrapper">
          <div style={{ width: '150px' }}></div>
          <h1 className="mainTitle">RSS React App Catalog</h1>
          <button className="errorBtn" onClick={handleTestError}>
            Test error
          </button>
        </div>
      </header>

      <Outlet />
    </div>
  );
}

export default Layout;
