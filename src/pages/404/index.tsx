import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <>
      <h1>Page was not found</h1>
      <button onClick={handleClick}>Return to Home Page</button>
    </>
  );
};

export default NotFoundPage;
