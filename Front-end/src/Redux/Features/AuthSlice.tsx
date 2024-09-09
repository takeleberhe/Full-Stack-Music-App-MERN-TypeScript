import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
interface LoginPayload {
  email: string;
  password: string;
}
interface UserState {
  user: { id: string; name: string } | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isLoggedIn: boolean;
}
/* define imitial state*/
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart(state, action: PayloadAction<LoginPayload>) {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = true;
      state.isLoggedIn = true;
      console.log(action.payload);
    },
    loginSuccess(state, action: PayloadAction<{ id: string; name: string }>) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart(state, action: PayloadAction<RegisterPayload>) {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
      console.log(action.payload);
    },
    registerSuccess(
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutStart(state) {
      state.loading = true;
    },
    logoutSuccess(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    logoutFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = userSlice.actions;
export default userSlice.reducer;
