import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './productsAPI';
import paginationReducer from './paginationSlice';
import searchReducer from './searchSlice';
import loadingStateSliceReduser from './loadingStateSlice';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    itemsPerPage: paginationReducer,
    searchRequest: searchReducer,
    homePageLoadingFlag: loadingStateSliceReduser,
    productPageLoadingFlag: loadingStateSliceReduser,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
