import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLanguages, postLanguages, deleteLanguage } from '../api/languageApi';

export const fetchLanguage = createAsyncThunk('language/fetchLanguage', async () => {
  const languages = await getLanguages();
  return languages;
});

export const selectToken = (state) => state.auth.token;

export const postLanguage = createAsyncThunk(
  'language/postLanguage',
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = selectToken(getState()); 
      const response = await postLanguages(formData, token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteLanguageById = createAsyncThunk(
  'language/deleteLanguage',
  async (languageID, { rejectWithValue, getState }) => {
    try {
      const token = selectToken(getState()); 
      const response = await deleteLanguage(languageID, token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const languagesSlice = createSlice({
  name: 'languages',
  initialState: {
    languages: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLanguage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.languages = action.payload;
      })
      .addCase(fetchLanguage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postLanguage.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(postLanguage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.languages.push(action.payload);
        state.error = null;
      })
      .addCase(postLanguage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteLanguageById.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.languages = state.languages.filter(item => item._id !== action.payload.post._id);
        state.error = null;
      });
  },
});

export default languagesSlice.reducer;