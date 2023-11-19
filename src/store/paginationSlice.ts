import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPaginationState {
  itemsPerPage: number;
}

const initialState: IPaginationState = {
  itemsPerPage: 30,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    changeItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const { changeItemsPerPage } = paginationSlice.actions;

export default paginationSlice.reducer;
