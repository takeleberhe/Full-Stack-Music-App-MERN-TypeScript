import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from "../Features/AuthSlice";
interface LoginResponse {
  id: string;
  name: string;
}
interface RegisterResponse {
  id: string;
  name: string;
}
/* Login API CALL */
function* loginUser(
  action: ReturnType<typeof loginStart>
): Generator<unknown, void, LoginResponse> {
  try {
    const response: LoginResponse = yield call(
      axios.post,
      "http://localhost:5000/Music/API/V1/login",
      action.payload
    );
    yield put(loginSuccess(response));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(loginFailure(error.message));
    } else {
      yield put(loginFailure("An unknown error occurred"));
    }
  }
}
/* registartion API CALL */
function* registerUser(
  action: ReturnType<typeof registerStart>
): Generator<unknown, void, RegisterResponse> {
  try {
    const response: RegisterResponse = yield call(
      axios.post,
      "http://localhost:5000/Music/API/V1/register",
      action.payload
    );
    yield put(registerSuccess(response));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(registerFailure(error.message));
    } else {
      yield put(registerFailure("An unknown error occurred"));
    }
  }
}
/* Logout API CALL */
function* logoutUser(): Generator<unknown, void, void> {
  try {
    yield call(axios.post, "http://localhost:5000/Music/API/V1/logout");
    yield put(logoutSuccess());
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(logoutFailure(error.message));
    } else {
      yield put(logoutFailure("An unknown error occurred"));
    }
  }
}

function* userSaga() {
  yield takeLatest(loginStart.type, loginUser);
  yield takeLatest(registerStart.type, registerUser);
  yield takeLatest(logoutStart.type, logoutUser);
}

export default userSaga;
