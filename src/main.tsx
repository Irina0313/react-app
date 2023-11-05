import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
/* <BrowserRouter basename="/PATH_TO_YUO_INDEX/"></BrowserRouter> */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </BrowserRouter>
);
