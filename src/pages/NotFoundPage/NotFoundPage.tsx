import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <>
      <h1>Page was not found</h1>
      <Link to="/1">Return to the Main Page</Link>
    </>
  );
}

export default NotFoundPage;
