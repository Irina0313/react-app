import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@/lib/store';
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary';
import './global.css';

export default function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <Provider store={store}>
        <ErrorBoundary>
          <Component {...props.pageProps} />
        </ErrorBoundary>
      </Provider>
    </>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  return { ...ctx };
};
