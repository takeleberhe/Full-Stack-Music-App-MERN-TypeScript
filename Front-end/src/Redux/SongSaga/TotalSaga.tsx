import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { getTotals, setTotals } from "../Features/TotalSlice";

interface ApiResponse<T> {
  data: T;
}
interface TotalsResponse {
  totalArtists: number;
  totalAlbums: number;
  totalSongs: number;
  totalGenres: number;
}
function* fetchTotals(): Generator<unknown, void, ApiResponse<TotalsResponse>> {
  try {
    const response = yield call(
      axios.get<ApiResponse<TotalsResponse>>,
      "http://localhost:5000/Music/API/V1/total"
    );
    // console.log(response.data);
    yield put(
      setTotals({
        totalArtists: response.data.totalArtists,
        totalAlbums: response.data.totalAlbums,
        totalSongs: response.data.totalSongs,
        totalGenres: response.data.totalGenres,
      })
    );
  } catch (error) {
    console.error(error);
  }
}

export function* TotalSaga() {
  yield takeLatest(getTotals.type, fetchTotals);
}

export default TotalSaga;