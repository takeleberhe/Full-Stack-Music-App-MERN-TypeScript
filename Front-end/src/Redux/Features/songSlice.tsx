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
  songList: [] as Song[],
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
    //fecth reducer
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
    //add reducer
    addSongStart(state, action: PayloadAction<FormData>) {
      state.loading = false;
      state.addSongSuccess = false;
      console.log(action.payload);
      state.addSongSuccess = false;
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
    //edit reducer
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
    },
    editSongFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    //delete reducer
    deleteSongStart(state, action: PayloadAction<string>) {
      state.loading = true;
      console.log(action.payload);
      state.deleteSongSuccess = false;
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.songList = state.songList.filter(
        (song) => song._id !== action.payload
      );
      state.loading = false;
      state.error = null;
      state.deleteSongSuccess = true;
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // search reducer
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
