import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';

const mockHandleClick = jest.fn();
const ErrorComp = () => {
  throw new Error('Test Error Boundary Component');
  return <></>;
};

const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

afterEach(() => {
  jest.clearAllMocks();
});
describe('ErrorBoundary component tests', () => {
  function initializePage() {
    jest.clearAllMocks();

    render(
      <ErrorBoundary>
        <ErrorComp />
      </ErrorBoundary>
    );
  }

  test('renders children when there is no error', async () => {
    await act(async () => {
      initializePage();
    });
    expect(
      screen.getByText('Sorry.. there was an error or no such page found.')
    ).toBeTruthy();
    expect(screen.getByText('Return to the Main Page')).toBeTruthy();
  });

  it('redirects to the main page when the button is clicked', async () => {
    await act(async () => {
      initializePage();
    });

    userEvent.click(
      screen.getByRole('button', { name: /Return to the Main Page/i })
    );

    waitFor(() => {
      expect(mockHandleClick).toHaveBeenCalledWith('/');
    });
  });
});
