import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gitHubService from '../../dal/GitHubService';

export const fetchUserRepo:any = createAsyncThunk(
  'user/fetchGetUserRepo',
  async ({ userName, repoName, currentPageUserRepo }: any) => {
    const res: any = await gitHubService.getUserRepos(userName, repoName, currentPageUserRepo);
    return res;
  },
);

// todo add offset

export const userRepo = createSlice({
  name: 'getUsers',
  initialState: {
    data: [],
    isLoading: true,
    currentPage: 1,
    total_count: 0,
    per_page: 30,
  },
  reducers: {
    setCurrentPageUserRepo(state, action) {
      state.currentPage = action.payload;
    },
    clearData(state) {
      state.currentPage = 1;
      state.data = [];
      state.isLoading = true;
    },
  },
  extraReducers: {
    [fetchUserRepo.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUserRepo.fulfilled]: (state, action) => {
      const { items } = action.payload.data;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.data.push(...items);
      state.isLoading = false;
      state.total_count = action.payload.data.total_count;
      state.per_page = action.payload.per_page;
    },
    [fetchUserRepo.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default userRepo.reducer;

export const { setCurrentPageUserRepo, clearData } = userRepo.actions;
