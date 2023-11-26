import React from 'react';
import { render } from '@testing-library/react';

describe('MyApp', () => {
  it('renders without crashing', () => {
    const DummyComponent = () => <div>Test Component</div>;

    const { asFragment } = render(<DummyComponent />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('wraps the app with the Redux Provider', () => {
    const DummyComponent = () => <div>Test Component</div>;

    const { asFragment } = render(<DummyComponent />);

    expect(asFragment()).toMatchSnapshot();

    expect(document.querySelector('div')).toHaveTextContent('Test Component');
  });
});
