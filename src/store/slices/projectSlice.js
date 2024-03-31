import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProjects, postProjects, deleteProject } from '../api/projectApi';

export const fetchProject = createAsyncThunk('project/fetchProject', async () => {
  const project = await getProjects();
  return project;
});

export const selectToken = (state) => state.auth.token;

export const postProject = createAsyncThunk(
  'project/postProject',
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = selectToken(getState());
      const response = await postProjects(formData, token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProjectById = createAsyncThunk(
  'project/deleteProject',
  async (projectID, { rejectWithValue, getState }) => {
    try {
      const token = selectToken(getState());
      const response = await deleteProject(projectID, token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postProject.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(postProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects.push(action.payload);
        state.error = null;
      })
      .addCase(postProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteProjectById.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.projects = state.projects.filter(item => item._id !== action.payload.post._id);
        state.error = null;
      });
  },
});

export default projectsSlice.reducer;