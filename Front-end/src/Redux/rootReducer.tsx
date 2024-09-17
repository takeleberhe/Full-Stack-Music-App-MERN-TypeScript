import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../Redux/Features/AuthSlice";
import songReducer from "./Features/songSlice";
import albumReducer from "../Redux/Features/AlbumSlice";
import genreReducer from "../Redux/Features/GenreSlice"
import totalReducer from "../Redux/Features/TotalSlice"
import artistsReducer from "../Redux/Features/ArtistsSlice"

const rootReducer = combineReducers({
  user: userReducer,
  songs: songReducer,
  album: albumReducer,
  totals:totalReducer,
  genres:genreReducer,
  artists:artistsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
