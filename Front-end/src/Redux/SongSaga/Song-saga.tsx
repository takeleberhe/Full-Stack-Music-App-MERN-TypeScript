import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
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
} from "../Features/songSlice";
//define songs interface
interface Song {
  _id: string;
  title: string;
  artist: string;
  genre: string;
  album: string;
}

/* Fetch Music API CALL */
function* fetchSong(): Generator<unknown, void, Song[]> {
  try {
    const response: Song[] = yield call(
      axios.get,
      "http://localhost:5000/Music/API/V1/songs"
    );
    //convert a response object in to array to easy manipulation in ui
    const albumsArray = Object.values(response);
    yield put(getSongSuccess(albumsArray));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(getSongFailure(error.message));
    } else {
      yield put(getSongFailure("An unknown error occurred"));
    }
  }
}
/* Add Music API CALL */
function* addSong(
  action: ReturnType<typeof addSongStart>
): Generator<unknown, void, Song> {
  try {
    const response: Song = yield call(
      axios.post,
      "http://localhost:5000/Music/API/V1/songs",
      action.payload
    );
    console.log(response);
    yield put(addSongSuccess(response));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(addSongFailure(error.message));
    } else {
      yield put(addSongFailure("An unknown error occurred"));
    }
  }
}
function* editSong(action: ReturnType<typeof editSongStart>) {
  try {
    const { _id, updatedSong } = action.payload;
    const response: Song = yield call(
      axios.patch,
      `http://localhost:5000/Music/API/V1/song/${_id}`,
      updatedSong
    );
    yield put(editSongSuccess(response));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(deleteSongFailure(error.message));
    } else {
      yield put(deleteSongFailure("An unknown error occurred"));
    }
  }
}
/* Delete Music API CALL */
function* deleteSong(
  action: ReturnType<typeof deleteSongStart>
): Generator<unknown, void, void> {
  if (action.payload) {
    try {
      yield call(
        axios.delete,
        `http://localhost:5000/Music/API/V1/song/${action.payload}`
      );
      yield put(deleteSongSuccess(action.payload));
    } catch (error: unknown) {
      if (error instanceof Error) {
        yield put(deleteSongFailure(error.message));
      } else {
        yield put(deleteSongFailure("An unknown error occurred"));
      }
    }
  } else {
    yield put(editSongFailure("Payload is undefined"));
  }
}

function* SongSaga() {
  yield takeLatest(getSongStart.type, fetchSong);
  yield takeLatest(addSongStart.type, addSong);
  yield takeLatest(editSongStart.type, editSong);
  yield takeLatest(deleteSongStart.type, deleteSong);
}

export default SongSaga;
