import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlbumState, Album } from "../types/types.d";

/* Initial state */
const initialState: AlbumState = {
  data: [],
  loading: false,
  addAlbumSuccess: false,
  error: null,
  currentAlbum: null,
  songs: [],
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    getAlbumStart(state) {
      state.loading = true;
    },
    getAlbumSuccess(state, action: PayloadAction<Album[]>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAlbumFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addAlbumStart(state, action: PayloadAction<FormData>) {
      state.loading = true;
      state.addAlbumSuccess = false;
      console.log(action.payload);
    },
    addAlbumSuccess(state, action: PayloadAction<Album>) {
      state.data = [...state.data, action.payload];
      state.loading = false;
      state.addAlbumSuccess = true;
    },
    addAlbumFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.addAlbumSuccess = false;
    },
    resetAddAlbumSuccess(state) {
      state.addAlbumSuccess = false;
    },
    updateAlbumStart(state) {
      state.loading = true;
    },
    updateAlbumSuccess(state, action: PayloadAction<Album>) {
      const index = state.data.findIndex(album => album._id === action.payload._id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateAlbumFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteAlbumStart(state) {
      state.loading = true;
    },
    deleteAlbumSuccess(state, action: PayloadAction<string>) {
      state.data = state.data.filter(album => album._id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteAlbumFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    /* fetchAlbumDetailsStart(state) {
      state.loading = true;
    }, */
    fetchAlbumDetailsStart(state, action: PayloadAction<string>) {
      state.loading = true;
      console.log(action.payload);
    },
    fetchAlbumDetailsSuccess(state, action: PayloadAction<Album>) {
      state.currentAlbum = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchAlbumDetailsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAlbumStart,
  getAlbumSuccess,
  getAlbumFailure,
  addAlbumStart,
  addAlbumSuccess,
  addAlbumFailure,
  resetAddAlbumSuccess,
  updateAlbumStart,
  updateAlbumSuccess,
  updateAlbumFailure,
  deleteAlbumStart,
  deleteAlbumSuccess,
  deleteAlbumFailure,
  fetchAlbumDetailsStart,
  fetchAlbumDetailsSuccess,
  fetchAlbumDetailsFailure,
} = albumSlice.actions;

export default albumSlice.reducer;
