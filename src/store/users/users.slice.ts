import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gitHubService from '../../dal/GitHubService';

interface FetchUsersProps {
  userName: string,
  usersCurrentPage: number
}

export const fetchUsers:any = createAsyncThunk(
  'users/fetchGetUsers',
  async ({
    userName,
    usersCurrentPage,
  }: FetchUsersProps) => await gitHubService.getAllUsers(userName, usersCurrentPage),
);

export const users = createSlice({
  name: 'getUsers',
  initialState: {
    usersData: [],
    usersIsLoading: false,
    usersCurrentPage: 1,
    usersTotalCount: 0,
  },
  reducers: {
    setCurrentPageUsers(state, action) {
      state.usersCurrentPage = action.payload;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.usersIsLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.usersData = action.payload.data.items;
      state.usersIsLoading = false;
      state.usersTotalCount = action.payload.data.total_count;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.usersIsLoading = false;
    },
  },
});

export default users.reducer;

export const { setCurrentPageUsers } = users.actions;
