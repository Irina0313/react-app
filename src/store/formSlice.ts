import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FormState = {
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: string;
  acceptTC: boolean;
  picture: string;
  country: string;
};

const initialState: FormState[] = [];

const formSlice = createSlice({
  name: 'formsData',
  initialState,
  reducers: {
    addResults: (state, action: PayloadAction<FormState>) => {
      return (state = [action.payload, ...state]);
    },
  },
});

export const { addResults } = formSlice.actions;

export default formSlice.reducer;
