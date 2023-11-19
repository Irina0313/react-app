import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearchnState {
  homePageLoadingFlag: boolean;
  productPageLoadingFlag: boolean;
}

const initialState: ISearchnState = {
  homePageLoadingFlag: false,
  productPageLoadingFlag: false,
};

const loadingStateSlice = createSlice({
  name: 'loadingFlag',
  initialState,
  reducers: {
    updateHomePageLoadingFlag: (state, action: PayloadAction<boolean>) => {
      state.homePageLoadingFlag = action.payload;
    },
    updateProductPageLoadingFlag: (state, action: PayloadAction<boolean>) => {
      state.productPageLoadingFlag = action.payload;
    },
  },
});

export const { updateHomePageLoadingFlag, updateProductPageLoadingFlag } =
  loadingStateSlice.actions;

export default loadingStateSlice.reducer;
