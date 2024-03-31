import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getExperiences, postExperiences, deleteExperience } from '../api/experienceApi';

export const fetchExperience = createAsyncThunk('experience/fetchExperience', async () => {
  const experiences = await getExperiences();
  return experiences;
});

export const selectToken = (state) => state.auth.token;

export const postExperience = createAsyncThunk(
  'experience/postExperience',
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = selectToken(getState()); 
      const response = await postExperiences(formData, token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteExperienceById = createAsyncThunk(
  'experience/deleteExperience',
  async (experienceID, { rejectWithValue, getState }) => {
    try {
      const token = selectToken(getState()); 
      const response = await deleteExperience(experienceID, token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const experiencesSlice = createSlice({
  name: 'experiences',
  initialState: {
    experiences: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperience.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExperience.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.experiences = action.payload;
      })
      .addCase(fetchExperience.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postExperience.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(postExperience.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.experiences.push(action.payload);
        state.error = null;
      })
      .addCase(postExperience.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteExperienceById.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.experiences = state.experiences.filter(item => item._id !== action.payload.post._id);
        state.error = null;
      });
  },
});

export default experiencesSlice.reducer;