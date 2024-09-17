import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Genre {
  _id: string;
  name: string;
  count: number;
  index?: number;
}

interface GenreState {
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

const initialState: GenreState = {
  genres: [],
  loading: false,
  error: null
};

const genreSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    fetchGenresStart(state) {
      state.loading = true;
    },
    fetchGenresSuccess(state, action: PayloadAction<Genre[]>) {
      state.loading = false;
      state.genres = action.payload.map((genre, index) => ({
        ...genre,
        name: genre._id, // Assuming _id is the name
        index: index + 1
      }));
    },
    fetchGenresFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchGenresStart, fetchGenresSuccess, fetchGenresFailure } = genreSlice.actions;
export default genreSlice.reducer;
