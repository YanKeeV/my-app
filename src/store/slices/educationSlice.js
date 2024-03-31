import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEducations, postEducations, deleteEducation } from '../api/educationApi';


export const fetchEducation = createAsyncThunk('education/fetchEducation', async () => {
  const education = await getEducations();
  return education;
});

export const selectToken = (state) => state.auth.token;

export const postEducation = createAsyncThunk(
  'education/postEducation',
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = selectToken(getState()); 
      const response = await postEducations(formData, token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteEducationById = createAsyncThunk(
  'education/deleteEducation',
  async (educationID, { rejectWithValue, getState }) => {
    try {
      const token = selectToken(getState()); 
      const response = await deleteEducation(educationID, token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const educationsSlice = createSlice({
  name: 'educations',
  initialState: {
    educations: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEducation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.educations = action.payload;
      })
      .addCase(fetchEducation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postEducation.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(postEducation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.educations.push(action.payload);
        state.error = null;
      })
      .addCase(postEducation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteEducationById.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.educations = state.educations.filter(item => item._id !== action.payload.post._id);
        state.error = null;
      });
  },
});

export default educationsSlice.reducer;