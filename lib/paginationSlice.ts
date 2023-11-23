import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPaginationState {
  itemsPerPage: number;
  currPageNum: number;
}

const initialState: IPaginationState = {
  itemsPerPage: 30,
  currPageNum: 1,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    changePaginationParams: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const { changePaginationParams } = paginationSlice.actions;

export default paginationSlice.reducer;
