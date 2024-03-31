import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../api/authApi';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  const data = await login(credentials);
  return data.accessToken;
});

export const logOut = createAsyncThunk('auth/logOut', async () => {
  return null;
});

const initialState = {
  token: localStorage.getItem('token') || null, 
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
        localStorage.setItem('token', action.payload); 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = null;
        localStorage.removeItem('token'); 
      });
  },
});

export default authSlice.reducer;
