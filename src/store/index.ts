import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import countryReduser from './countrySlice';

export const store = configureStore({
  reducer: {
    formData: formReducer,
    countries: countryReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
