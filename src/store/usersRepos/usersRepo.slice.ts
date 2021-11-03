import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gitHubService from '../../dal/GitHubService';

export const fetchUsersRepo:any = createAsyncThunk(
  'usersRepo/fetchGetUsersRepo',
  async (users: []) => {
    const res = await gitHubService.getAllUsersRepos(users);
    return res;
  },
);

export const usersRepos = createSlice({
  name: 'getUsers',
  initialState: {
    usersRepo: [],
    isLoading: true,
  },
  reducers: {},

  extraReducers: {
    [fetchUsersRepo.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUsersRepo.fulfilled]: (state, action) => {
      state.usersRepo = action.payload;
      state.isLoading = false;
    },
    [fetchUsersRepo.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default usersRepos.reducer;
