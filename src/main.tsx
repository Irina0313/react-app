import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
