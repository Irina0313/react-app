import { render, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import NotFoundPage from './NotFoundPage';
import { BrowserRouter } from 'react-router-dom';

afterEach(() => {
  cleanup();
});
describe('Button Return to the Main Page should redirect to the Page 1', () => {
  test('mocks and calls window.location.replace', () => {
    const replace = jest.fn();

    Object.defineProperty(window, 'location', {
      value: { replace },
      writable: true,
    });

    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <NotFoundPage />
        </Provider>
      </BrowserRouter>
    );
    const button = getByText(/Return to the Main Page/i);

    fireEvent.click(button);

    expect(replace).toHaveBeenCalledWith('/page=1');
  });
});
