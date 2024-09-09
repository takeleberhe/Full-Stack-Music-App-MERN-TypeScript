import { all, fork } from "redux-saga/effects";
import userSaga from "../Redux/AuthSaga/AuthSaga";
import SongSaga from "./SongSaga/Song-saga";
import albumSaga from "./AlbumSaga/AlbumSaga";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(SongSaga), fork(albumSaga)]);
}
