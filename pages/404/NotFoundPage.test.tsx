import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import NotFoundPage from '.';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};

describe('NotFoundPage component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders the NotFoundPage component', () => {
    render(<NotFoundPage />);
    const pageTitle = screen.getByText('Page was not found');
    const returnButton = screen.getByText('Return to the Main Page');

    expect(pageTitle).toBeInTheDocument();
    expect(returnButton).toBeInTheDocument();
  });

  it('calls router.push with the correct path when button is clicked', () => {
    render(<NotFoundPage />);
    const returnButton = screen.getByText('Return to the Main Page');

    fireEvent.click(returnButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});
