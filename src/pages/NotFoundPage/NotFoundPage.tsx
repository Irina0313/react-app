import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <>
      <h1 className="notFoundPageTitle">Page was not found</h1>
      <button
        className="notFoundPageBtn"
        onClick={() => {
          window.location.replace('/page=1');
        }}
      >
        Return to the Main Page
      </button>
    </>
  );
}

export default NotFoundPage;
