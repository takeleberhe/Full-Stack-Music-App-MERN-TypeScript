import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TotalsState {
  totalArtists: number;
  totalAlbums: number;
  totalSongs: number;
  totalGenres: number;
}

const initialState: TotalsState = {
  totalArtists: 0,
  totalAlbums: 0,
  totalSongs: 0,
  totalGenres: 0,
};

const totalSlice = createSlice({
  name: 'total',
  initialState,
  reducers: {
    setTotals: (state, action: PayloadAction<TotalsState>) => {
      state.totalArtists = action.payload.totalArtists;
      state.totalAlbums = action.payload.totalAlbums;
      state.totalSongs = action.payload.totalSongs;
      state.totalGenres = action.payload.totalGenres;
    },
    getTotals: (state) => state,
  },
});

export const { setTotals, getTotals } = totalSlice.actions;
export default totalSlice.reducer;
