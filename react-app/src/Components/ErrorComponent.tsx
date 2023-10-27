import { Component } from 'react';

interface ErrorComponentProps {
  err: Error | null | unknown;
}
class ErrorComponent extends Component<ErrorComponentProps> {
  constructor(props: ErrorComponentProps) {
    super(props);
  }

  componentDidMount() {
    throw this.props.err ? this.props.err : new Error("It's a test error");
  }

  render() {
    return <div>Test Error</div>;
  }
}

export default ErrorComponent;
