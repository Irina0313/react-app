import './NotFoundPage.css';
import { useAppDispatch } from '../../hooks/reduxsHooks';
import { updateSearchRequest } from '../../store/searchSlice';

function NotFoundPage() {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(updateSearchRequest(''));
    window.location.replace('/page=1');
  };
  return (
    <>
      <h1 className="notFoundPageTitle">Page was not found</h1>
      <button className="notFoundPageBtn" onClick={handleClick}>
        Return to the Main Page
      </button>
    </>
  );
}

export default NotFoundPage;
