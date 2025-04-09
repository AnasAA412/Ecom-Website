import { axiosInstance } from "@/config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const registerURL = "/api/auth/register";
const loginURL = "/api/auth/login";
const checkAuthURL = "/api/auth/check-auth";
const logoutURL = "/api/auth/logout";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axiosInstance.post(
      registerURL,
      formData,

      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axiosInstance.post(
    loginURL,
    formData,

    {
      withCredentials: true,
    }
  );
  return response.data;
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axiosInstance.post(
    logoutURL,
    {},

    {
      withCredentials: true,
    }
  );
  return response.data;
});

export const checkAuth = createAsyncThunk("/auth/checkAuth", async () => {
  const response = await axiosInstance.get(
    checkAuthURL,

    {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      })
      .addCase(registerUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);

        (state.isLoading = false),
          (state.user = action.payload.success ? action.payload.user : null),
          (state.isAuthenticated = action.payload.success ? true : false);
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        // console.log(action);

        (state.isLoading = false),
          (state.user = action.payload.success ? action.payload.user : null),
          (state.isAuthenticated = action.payload.success ? true : false);
      })
      .addCase(checkAuth.rejected, (state, action) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
