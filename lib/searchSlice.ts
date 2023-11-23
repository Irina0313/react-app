import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearchnState {
  searchRequest: string;
}

const initialState: ISearchnState = {
  searchRequest: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchRequest: (state, action: PayloadAction<string>) => {
      state.searchRequest = action.payload;
      localStorage.setItem('savedSearch', JSON.stringify(action.payload));
    },
  },
});

export const { updateSearchRequest } = searchSlice.actions;

export default searchSlice.reducer;
