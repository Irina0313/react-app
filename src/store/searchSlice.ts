import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import safeJsonParse from '../utils/JsonActions';

interface ISearchnState {
  searchRequest: string | null;
}

const initialState: ISearchnState = {
  searchRequest: safeJsonParse(localStorage.savedSearch) || null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchRequest: (state, action: PayloadAction<string | null>) => {
      state.searchRequest = action.payload;
      localStorage.setItem('savedSearch', JSON.stringify(action.payload));
    },
  },
});

export const { updateSearchRequest } = searchSlice.actions;

export default searchSlice.reducer;
