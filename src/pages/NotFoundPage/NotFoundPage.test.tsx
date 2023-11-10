import { render, fireEvent } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

describe('Button Return to the Main Page should redirect to the Page 1', () => {
  test('mocks and calls window.location.replace', () => {
    const replace = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { replace },
      writable: true,
    });

    const { getByText } = render(<NotFoundPage />);

    const button = getByText(/Return to the Main Page/i);

    fireEvent.click(button);

    expect(replace).toHaveBeenCalledWith('/page=1');
  });
});
