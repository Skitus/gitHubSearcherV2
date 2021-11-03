import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gitHubService from '../../dal/GitHubService';

export const fetchUsers:any = createAsyncThunk(
  'users/fetchGetUsers',
  async ({ userName, currentPageUsers }: any) => {
    const res: any = await gitHubService.getAllUsers(userName, currentPageUsers);
    return res;
  },
);

export const users = createSlice({
  name: 'getUsers',
  initialState: {
    data: [],
    isLoading: true,
    currentPage: 1,
    total_count: 0,
    per_page: 5,
  },
  reducers: {
    setCurrentPageUsers(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.data = action.payload.data.items;
      state.isLoading = false;
      state.total_count = action.payload.data.total_count;
      state.per_page = action.payload.per_page;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default users.reducer;

export const { setCurrentPageUsers } = users.actions;
