import { render, act, screen, cleanup } from '@testing-library/react';
import ErrorComponent from '../components/errorBoundary/ErrorComponent';

afterEach(() => {
  cleanup();
});
describe('ErrorComponent tests', () => {
  test('renders "Test Error" message when an error is thrown', async () => {
    jest
      .spyOn(ErrorComponent.prototype, 'componentDidMount')
      .mockImplementation(() => {});

    await act(async () => {
      render(<ErrorComponent err={null} />);
    });
    const errorMessage = screen.getByText(/Test Error/i);
    expect(errorMessage).toBeTruthy();
  });
});
