import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gitHubService from '../../dal/http';

export const fetchUsersRepo:any = createAsyncThunk(
  'usersRepo/fetchGetUsersRepo',
  async (users) => {
    const res = await gitHubService.getAllUsersRepos(users);
    console.log('res', res);
    return res;
  },
);

export const usersRepoSlice = createSlice({
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

export default usersRepoSlice.reducer;
