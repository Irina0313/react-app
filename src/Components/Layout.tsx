import { Outlet, useParams } from 'react-router-dom';
import './Layout.css';

export interface LayoutProps {
  handleTestError: () => void;
}

function Layout(props: LayoutProps) {
  const { handleTestError } = props;
  const { id } = useParams();
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
