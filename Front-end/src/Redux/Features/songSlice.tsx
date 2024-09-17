import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Song {
  _id: string;
  title: string;
  artist: string;
  genre: string;
  album: string;
}

interface SongState {
  songList: Song[];
  loading: boolean;
  error: string | null;
  addSongSuccess: boolean;
  deleteSongSuccess: boolean;
  editSongSuccess: boolean;
  searchQuery: string;
}

const initialState: SongState = {
  songList: [],
  loading: false,
  error: null,
  addSongSuccess: false,
  deleteSongSuccess: false,
  editSongSuccess: false,
  searchQuery: "",
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    // Fetch reducers
    getSongStart(state) {
      state.loading = true;
    },
    getSongSuccess(state, action: PayloadAction<Song[]>) {
      state.songList = action.payload;
      state.loading = false;
      state.error = null;
    },
    getSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // Add reducers
    addSongStart(state, action: PayloadAction<FormData>) {
      state.loading = true;
      state.addSongSuccess = false;
      console.log(action.payload);
    },
    addSongSuccess(state, action: PayloadAction<Song>) {
      state.songList.push(action.payload);
      state.loading = false;
      state.addSongSuccess = true;
      state.error = null;
    },
    addSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.addSongSuccess = false;
    },
    // Edit reducers
    editSongStart(
      state,
      action: PayloadAction<{ _id: string; updatedSong: Partial<Song> }>
    ) {
      state.loading = true;
      console.log(action.payload);
    },
    editSongSuccess(state, action: PayloadAction<Song>) {
      const index = state.songList.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songList[index] = action.payload;
      }
      state.loading = false;
      state.editSongSuccess = true;
      state.error = null;
    },
    editSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.editSongSuccess = false;
    },
    // Delete reducers
    deleteSongStart(state, action: PayloadAction<string>) {
      state.loading = true;
      state.deleteSongSuccess = false;
      console.log(action.payload);
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.songList = state.songList.filter(
        (song) => song._id !== action.payload
      );
      state.loading = false;
      state.deleteSongSuccess = true;
      state.error = null;
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // Search reducer
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  getSongStart,
  getSongSuccess,
  getSongFailure,
  addSongStart,
  addSongSuccess,
  addSongFailure,
  editSongStart,
  editSongSuccess,
  editSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
  setSearchQuery,
} = songSlice.actions;

export default songSlice.reducer;
