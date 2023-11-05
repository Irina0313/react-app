import { Component, ReactNode } from 'react';
import './ErrorBoundary.css';

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
          <h1 className="errorTitle">
            Sorry.. there was an error or no such page found.
          </h1>
          <button
            className="errBoundaryBtn"
            onClick={() => {
              window.location.replace('/page/1');
            }}
          >
            Return to the Main Page
          </button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
