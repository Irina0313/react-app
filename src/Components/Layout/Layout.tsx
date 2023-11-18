import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import useGetURLParams from '../../hooks/getURLParams';
import ErrorComponent from '../ErrorBoundary/ErrorComponent';
import './Layout.css';

function Layout() {
  const navigate = useNavigate();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isTestError, setIsTestError] = useState(false);
  const { pageNumber, id } = useGetURLParams();
  const urlParams = useParams();

  const handleTestError = () => {
    setIsTestError(true);
    throw new Error('test Error');
  };

  useEffect(() => {
    if (isFirstLoad && !urlParams.page) {
      console.log('dd');
      navigate('/page=1');
      setIsFirstLoad(false);
    }
  }, [navigate, isFirstLoad, pageNumber, urlParams.page]);

  return (
    <div className={`mainContainer ${id && 'modalOpened'}`}>
      <header className="header ">
        <div className="titleWrapper">
          <div style={{ width: '150px' }} />
          <h1 className="mainTitle">RSS React App Catalog</h1>
          <button className="errorBtn" onClick={handleTestError}>
            Test error
          </button>
        </div>
      </header>
      {isTestError && <ErrorComponent err={null} />}
      <Outlet />
    </div>
  );
}

export default Layout;
