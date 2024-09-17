import { all, fork } from "redux-saga/effects";
import userSaga from "../Redux/AuthSaga/AuthSaga";
import SongSaga from "./SongSaga/Song-saga";
import albumSaga from "./AlbumSaga/AlbumSaga";
import GenreSaga from "./SongSaga/GenresSaga";
import TotalSaga from "./SongSaga/TotalSaga";
import ArtistsSaga from "./SongSaga/ArtistSaga";

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(SongSaga),
    fork(albumSaga),
    fork(GenreSaga),
    fork(TotalSaga),
    fork(ArtistsSaga),
  ]);
}
