import React, { Component, ErrorInfo } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  readonly children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(
      'ErrorBoundary did catch an error: ',
      error,
      info.componentStack
    );
    this.setState({
      hasError: true,
      error: error,
    });
  }
  public render() {
    if (this.state.hasError) {
      return (
        <>
          <h1 className={styles.errorTitle}>
            Sorry.. there was an error or no such page found.
          </h1>
          <button
            className={styles.errBoundaryBtn}
            onClick={() => {
              window.location.replace('/');
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
