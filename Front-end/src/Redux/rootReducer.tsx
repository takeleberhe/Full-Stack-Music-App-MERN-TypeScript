import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../Redux/Features/AuthSlice";
import songReducer from "./Features/songSlice";
import albumReducer from "../Redux/Features/AlbumSlice";

const rootReducer = combineReducers({
  user: userReducer,
  songs: songReducer,
  album: albumReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
