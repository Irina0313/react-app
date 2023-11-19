import { render, screen, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';

afterEach(() => {
  cleanup();
});
describe('App tests', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  function initializePage() {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
  }

  test('renders the app with BrowserRouter', async () => {
    await act(async () => {
      initializePage();
    });

    expect(screen.getByText(/RSS React App Catalog/i)).toBeTruthy();
  });

  test('App snapshot', async () => {
    const app = await act(async () => {
      initializePage();
    });

    expect(app).toMatchSnapshot();
  });
});
