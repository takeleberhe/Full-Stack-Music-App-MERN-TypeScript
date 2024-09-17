import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  getArtistStart,
  getArtistSuccess,
  getArtistFailure,
} from "../Features/ArtistsSlice";

interface Artist {
  artist: string;
  numberOfAlbums: number;
  numberOfSongs: number;
}

interface ApiResponse<T> {
  data: T;
}

function* fetchArtists(): Generator<unknown, void, ApiResponse<Artist[]>> {
  try {
    const response = yield call(
      axios.get,
      "http://localhost:5000/Music/API/V1/artists"
    );
    // console.log(response.data);
    yield put(getArtistSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(getArtistFailure(error.message));
    } else {
      yield put(getArtistFailure("An unknown error occurred"));
    }
  }
}

export function* ArtistsSaga() {
  yield takeLatest(getArtistStart.type, fetchArtists);
}

export default ArtistsSaga;