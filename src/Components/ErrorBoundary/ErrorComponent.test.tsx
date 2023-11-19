import { render, act, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';

afterEach(() => {
  cleanup();
});
describe('ErrorComponent tests', () => {
  test('renders "Test Error" message when an error is thrown', async () => {
    jest
      .spyOn(ErrorComponent.prototype, 'componentDidMount')
      .mockImplementation(() => {});

    await act(async () => {
      render(
        <BrowserRouter>
          <ErrorComponent err={null} />
        </BrowserRouter>
      );
    });
    const errorMessage = screen.getByText(/Test Error/i);
    expect(errorMessage).toBeTruthy();
  });
});
