import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  getAlbumStart,
  getAlbumSuccess,
  getAlbumFailure,
  addAlbumStart,
  addAlbumSuccess,
  addAlbumFailure,
  updateAlbumStart,
  updateAlbumSuccess,
  updateAlbumFailure,
  deleteAlbumStart,
  deleteAlbumSuccess,
  deleteAlbumFailure,
  fetchAlbumDetailsStart,
  fetchAlbumDetailsSuccess,
  fetchAlbumDetailsFailure,
} from "../Features/AlbumSlice";
import { fetchAlbumsApi } from "../API/APIs";
import { ApiResponse, Album, FetchAlbumDetailsAction } from "../types/types.d";

/* Fetch Album API CALL */
function* fetchAlbum(): Generator<unknown, void, Album[]> {
  try {
    const response: Album[] = yield call(fetchAlbumsApi);
    console.log(response);
    yield put(getAlbumSuccess(response));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(getAlbumFailure(error.message));
    } else {
      yield put(getAlbumFailure("An unknown error occurred"));
    }
  }
}

/* Add Album API CALL */
function* addAlbum(
  action: ReturnType<typeof addAlbumStart>
): Generator<unknown, void, Album> {
  try {
    const response: Album = yield call(
      axios.post,
      "http://localhost:5000/Music/API/V1/albums",
      action.payload
    );
    console.log(response);
    yield put(addAlbumSuccess(response));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(addAlbumFailure(error.message));
    } else {
      yield put(addAlbumFailure("An unknown error occurred"));
    }
  }
} 

/* Update Album API CALL */
function* updateAlbum(
  action: ReturnType<typeof updateAlbumStart>
): Generator<unknown, void, Album> {
  if (action.payload) {
    try {
      const response: Album = yield call(
        axios.put,
        `http://localhost:5000/Music/API/V1/album/${action.payload}`,
        action.payload
      );
      yield put(updateAlbumSuccess(response));
    } catch (error: unknown) {
      if (error instanceof Error) {
        yield put(updateAlbumFailure(error.message));
      } else {
        yield put(updateAlbumFailure("An unknown error occurred"));
      }
    }
  } else {
    yield put(updateAlbumFailure("Payload is undefined"));
  }
}
/* Delete Album API CALL */
function* deleteAlbum(
  action: ReturnType<typeof deleteAlbumStart>
): Generator<unknown, void, void> {
  if (action.payload) {
    try {
      yield call(
        axios.delete,
        `http://localhost:5000/Music/API/V1/album/${action.payload}`
      );
      yield put(deleteAlbumSuccess(action.payload));
    } catch (error: unknown) {
      if (error instanceof Error) {
        yield put(deleteAlbumFailure(error.message));
      } else {
        yield put(deleteAlbumFailure("An unknown error occurred"));
      }
    }
  } else {
    yield put(updateAlbumFailure("Payload is undefined"));
  }
}
/* Album Detail API CALL */
function* fetchAlbumDetails(action: FetchAlbumDetailsAction) {
  try {
    const album: ApiResponse<Album> = yield call(
      axios.get,
      `http://localhost:5000/Music/API/V1/album/${action.payload}`
    );
    const data = album.data;
    yield put(fetchAlbumDetailsSuccess(data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(fetchAlbumDetailsFailure(error.message));
    } else {
      yield put(fetchAlbumDetailsFailure("An unknown error occurred"));
    }
  }
}
function* albumSaga() {
  yield takeLatest(getAlbumStart.type, fetchAlbum);
  yield takeLatest(addAlbumStart.type, addAlbum);
  yield takeLatest(updateAlbumStart.type, updateAlbum);
  yield takeLatest(deleteAlbumStart.type, deleteAlbum);
  yield takeLatest(fetchAlbumDetailsStart.type, fetchAlbumDetails);
}
export default albumSaga;
