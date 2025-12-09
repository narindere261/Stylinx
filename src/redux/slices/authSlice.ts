// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://my-backend-sxqn.onrender.com";

// -------- SIGNUP THUNK --------
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }: { name: string; email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, { name, email, password });

      // Backend returns: { message, user }
      return {
        user: response.data.user,
        token: response.data.token ?? null, // in case signup doesn’t provide token
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// -------- LOGIN THUNK --------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });

      // Save both user + token
      return {
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// --------- STATE INTERFACE ----------
interface AuthState {
  user: null | { id: string; name: string; email: string };
  token: string | null;
  loading: boolean;
  error: string | null;
}

// -------- INITIAL STATE --------
const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// -------- SLICE --------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
     clearError: (state) => {
    state.error = null;
  },
     clearLoading: (state) => {
    state.loading = false;
  }
  },
  extraReducers: (builder) => {
    builder
      // --------- SIGNUP -----------
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signupUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --------- LOGIN -----------
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, clearLoading } = authSlice.actions;
export default authSlice.reducer;
