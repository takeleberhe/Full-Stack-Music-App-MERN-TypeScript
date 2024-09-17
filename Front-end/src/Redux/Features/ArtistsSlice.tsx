import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Artist {
  artist: string;
  numberOfAlbums: number;
  numberOfSongs: number;
}

interface ArtistState {
  artists: Artist[];
  loading: boolean;
  error?: string;
}

const initialState: ArtistState = {
  artists: [],
  loading: false,
};

const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    getArtistStart(state) {
      state.loading = true;
      state.error = undefined;
    },
    getArtistSuccess(state, action: PayloadAction<Artist[]>) {
      state.artists = action.payload;
      console.log(state.artists);
      state.loading = false;
    },
    getArtistFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getArtistStart, getArtistSuccess, getArtistFailure } =
  artistSlice.actions;
export default artistSlice.reducer;