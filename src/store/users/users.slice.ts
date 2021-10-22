import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gitHubService from '../../dal/http';

export const fetchUsers:any = createAsyncThunk(
  'users/fetchGetUsers',
  async (userName:string) => {
    const res: any = await gitHubService.getAllUsers(userName);
    return res.items;
  },
);

export const usersReducerSlice = createSlice({
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
      state.isLoading = false;
    },
  },
});

export default usersReducerSlice.reducer;
