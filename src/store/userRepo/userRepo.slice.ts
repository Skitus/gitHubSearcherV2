import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gitHubService from '../../dal/GitHubService';

interface FetchUserRepoProps {
  userName: string,
  repoName: string,
  userRepoCurrentPage: number
}

export const fetchUserRepo: any = createAsyncThunk(
  'user/fetchGetUserRepo',
  async (
    {
      userName,
      repoName,
      userRepoCurrentPage,
    }: FetchUserRepoProps,
  ) => await gitHubService.getUserRepos(userName, repoName, userRepoCurrentPage),
);

export const userRepo = createSlice({
  name: 'getUsers',
  initialState: {
    userRepoData: [],
    userRepoIsLoading: false,
    userRepoCurrentPage: 1,
    userRepoTotalCount: 0,
  },
  reducers: {
    setCurrentPageUserRepo(state, action) {
      state.userRepoIsLoading = true;
      state.userRepoCurrentPage = action.payload;
    },
    clearData(state) {
      state.userRepoCurrentPage = 1;
      state.userRepoData = [];
      state.userRepoIsLoading = true;
    },
  },
  extraReducers: {
    [fetchUserRepo.pending]: (state, action) => {
      state.userRepoIsLoading = true;
    },
    [fetchUserRepo.fulfilled]: (state, action) => {
      const { items } = action.payload.data;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.userRepoData.push(...items);
      state.userRepoTotalCount = action.payload.data.total_count;
      state.userRepoIsLoading = false;
    },
    [fetchUserRepo.rejected]: (state, action) => {
      state.userRepoIsLoading = false;
    },
  },
});

export default userRepo.reducer;

export const { setCurrentPageUserRepo, clearData } = userRepo.actions;
