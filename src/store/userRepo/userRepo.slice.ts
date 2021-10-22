import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gitHubService from '../../dal/http';

export const fetchUserRepo:any = createAsyncThunk(
  'user/fetchGetUserRepo',
  async ({ userName, repos }: any) => {
    const res: any = await gitHubService.getUserRepos(userName, repos);
    return res.items;
  },
);

export const userReducerRepo = createSlice({
  name: 'getUsers',
  initialState: {
    userRepo: [],
    isLoading: true,
  },

  reducers: {

  },
  extraReducers: {
    [fetchUserRepo.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUserRepo.fulfilled]: (state, action) => {
      state.userRepo = action.payload;
      state.isLoading = false;
    },
    [fetchUserRepo.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default userReducerRepo.reducer;
