import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PersistConfig, persistReducer } from "redux-persist";

import swal from "sweetalert";

import storage from "redux-persist/lib/storage";

interface IUser {
  email: string;
  password: string;
  data?: {
    accessToken: string;
  };
  success?: boolean;
}

export interface AuthState {
  success?: boolean;
  user: IUser | null;
  loading: boolean;
  error: string | null;
  attemptedPath?: string;
}
const initialState: AuthState = {
  success: false,
  user: null,
  loading: false,
  error: null,
  attemptedPath: "/"
};

// async thunk for login user

export const loginUser = createAsyncThunk<
  IUser,
  { email: string; password: string }
>("auth/login", async ({ email, password }: IUser) => {
  try {
    const res = await axios.post<IUser>(
      "https://book-server-emonibnsalim-gmailcom.vercel.app/api/v1/users/login",
      { email, password }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    const errorMessage =
      (error as { response: { data: { message: string } } }).response?.data
        ?.message || "An error occurred.";
    console.log(errorMessage);
    // Show the error message using swal
    swal({
      title: "Please Log In!",
      text: errorMessage,
      icon: "warning",
      buttons: {
        ok: {
          text: "Ok!",
          value: true
        }
      }
    });
    throw error;
  }
});

export const createUser = createAsyncThunk<
  IUser,
  { email: string; password: string }
>("auth/create-user", async (newUser) => {
  try {
    const res = await axios.post<IUser>(
      "https://book-server-emonibnsalim-gmailcom.vercel.app/api/v1/users/create-user",
      newUser
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    const errorMessage =
      (error as { response: { data: { message: string } } }).response?.data
        ?.message || "An error occurred.";
    console.log(errorMessage);
    // Show the error message using swal
    swal({
      title: "Warning!",
      text: errorMessage,
      icon: "warning",
      buttons: {
        ok: {
          text: "Ok!",
          value: true
        }
      }
    });
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAttemptedPath: (state, action) => {
      state.attemptedPath = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.attemptedPath = "/";
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error.message || "An error Occurred";
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  }
});

const persistConfig: PersistConfig<AuthState> = {
  key: "auth", // Specify the key under which this reducer's state will be saved
  storage
  // whitelist: ['user'], // Specify the fields to persist
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { logOut, setAttemptedPath } = authSlice.actions;
export default persistedAuthReducer;
