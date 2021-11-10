import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gitHubService from '../../dal/GitHubService';

interface FetchUserRepoProps {
  userName: string,
  repoName: string,
  currentPageUserRepo: number
}

export const fetchUserRepo: any = createAsyncThunk(
  'user/fetchGetUserRepo',
  async (
    {
      userName,
      repoName,
      currentPageUserRepo,
    }: FetchUserRepoProps,
  ) => await gitHubService.getUserRepos(userName, repoName, currentPageUserRepo),
);

export const userRepo = createSlice({
  name: 'getUsers',
  initialState: {
    data: [],
    isLoading: true,
    currentPage: 1,
    totalCount: 0,
  },
  reducers: {
    setCurrentPageUserRepo(state, action) {
      state.isLoading = true;
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
      state.totalCount = action.payload.data.total_count;
      state.isLoading = false;
    },
    [fetchUserRepo.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default userRepo.reducer;

export const { setCurrentPageUserRepo, clearData } = userRepo.actions;
