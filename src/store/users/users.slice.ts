import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gitHubService from '../../dal/http';

export const fetchUsers:any = createAsyncThunk(
  'users/fetchGetUsers',
  async ({ userName, perPage }: any) => {
    const res: any = await gitHubService.getAllUsers(userName, perPage);
    return res;
  },
);

export const users = createSlice({
  name: 'getUsers',
  initialState: {
    users: [],
    isLoading: true,
  },
  reducers: {},

  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.isLoading = true;
    },
  },
});

export default users.reducer;
