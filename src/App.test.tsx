import { render, screen } from '@testing-library/react';

import App from './App';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';

test('renders the app with BrowserRouter', () => {
  render(
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  );

  expect(screen.getByText(/RSS React App Catalog/i)).toBeTruthy();
});
