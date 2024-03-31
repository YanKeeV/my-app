import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSkills, postSkills, deleteSkill } from '../api/skillApi';

export const fetchSkill = createAsyncThunk('skill/fetchSkill', async () => {
  const skills = await getSkills();
  return skills;
});

export const selectToken = (state) => state.auth.token;

export const postSkill = createAsyncThunk(
  'skill/postSkill',
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = selectToken(getState()); 
      const response = await postSkills(formData, token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteSkillById = createAsyncThunk(
  'skill/deleteSkill',
  async (skillID, { rejectWithValue, getState }) => {
    try {
      const token = selectToken(getState()); 
      const response = await deleteSkill(skillID, token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    skills: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkill.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSkill.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.skills = action.payload;
      })
      .addCase(fetchSkill.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postSkill.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(postSkill.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.skills.push(action.payload);
        state.error = null;
      })
      .addCase(postSkill.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteSkillById.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.skills = state.skills.filter(item => item._id !== action.payload.post._id);
        state.error = null;
      });
  },
});

export default skillsSlice.reducer;