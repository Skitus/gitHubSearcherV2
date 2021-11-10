import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gitHubService from '../../dal/GitHubService';

export const fetchUser:any = createAsyncThunk(
  'user/fetchGetUser',
  async (userName: string) => await gitHubService.getUserById(userName),
);

export const user = createSlice({
  name: 'getUsers',
  initialState: {
    data: [],
    isLoading: true,
  },
  reducers: {},

  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
    },
    [fetchUser.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default user.reducer;
