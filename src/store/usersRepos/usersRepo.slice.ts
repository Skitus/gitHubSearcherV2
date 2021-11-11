import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gitHubService from '../../dal/GitHubService';

export const fetchUsersRepo:any = createAsyncThunk(
  'usersRepo/fetchGetUsersRepo',
  async (users: []) => await gitHubService.getAllUsersRepos(users),
);

export const usersRepos = createSlice({
  name: 'getUsers',
  initialState: {
    usersRepoData: [],
    isLoading: false,
  },
  reducers: {},

  extraReducers: {
    [fetchUsersRepo.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUsersRepo.fulfilled]: (state, action) => {
      state.usersRepoData = action.payload;
      state.isLoading = false;
    },
    [fetchUsersRepo.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default usersRepos.reducer;
