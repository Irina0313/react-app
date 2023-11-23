import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { productsApi } from './productsApi';
import paginationReducer from './paginationSlice';
import searchReducer from './searchSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      [productsApi.reducerPath]: productsApi.reducer,
      paginationParams: paginationReducer,
      search: searchReducer,
      /*homePageLoadingFlag: loadingStateSliceReduser,
    productPageLoadingFlag: loadingStateSliceReduser, */
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
