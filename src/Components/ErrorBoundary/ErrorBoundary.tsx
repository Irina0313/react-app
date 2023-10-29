import { Component, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>
            Sorry.. there was an error
            <br />
            <br />
            Try reloading the page
          </h1>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
