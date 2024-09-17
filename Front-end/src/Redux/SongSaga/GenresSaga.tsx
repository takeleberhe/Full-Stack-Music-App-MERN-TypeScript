import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchGenresStart, fetchGenresSuccess, fetchGenresFailure } from '../Features/GenreSlice';

interface Genre {
  _id: string;
  name: string;
  count: number;
}

interface ApiResponse<T> {
  data: T;
}

function* fetchGenres(): Generator<unknown, void, ApiResponse<Genre[]>> {
  try {
    const response = yield call(
      axios.get,
      'http://localhost:5000/Music/API/V1/songs/genre'
    );
    console.log(response.data);
    yield put(fetchGenresSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(fetchGenresFailure(error.message));
    } else {
      yield put(fetchGenresFailure('An unknown error occurred'));
    }
  }
}

export function* genresSaga() {
  yield takeLatest(fetchGenresStart.type, fetchGenres);
}

export default genresSaga;
