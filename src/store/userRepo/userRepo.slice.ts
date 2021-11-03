import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gitHubService from '../../dal/GitHubService';

export const fetchUserRepo:any = createAsyncThunk(
  'user/fetchGetUserRepo',
  async ({ userName, repoName, currentPageUserRepo }: any) => {
    const res: any = await gitHubService.getUserRepos(userName, repoName, currentPageUserRepo);
    return res;
  },
);

export const userRepo = createSlice({
  name: 'getUsers',
  initialState: {
    data: [],
    isLoading: true,
    currentPage: 1,
    total_count: 0,
  },
  reducers: {
    setCurrentPageUserRepo(state, action) {
      state.currentPage = action.payload;
    },
    clearData(state) {
      state.currentPage = 1;
      state.isLoading = true;
      state.data = [];
    },
  },
  extraReducers: {
    [fetchUserRepo.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUserRepo.fulfilled]: (state, action) => {
      /*      const { items } = action.payload; */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      /*      state.data.push(...items); */
      state.data = action.payload.items;
      state.isLoading = false;
      state.total_count = action.payload.total_count;
    },
    [fetchUserRepo.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default userRepo.reducer;

export const { setCurrentPageUserRepo, clearData } = userRepo.actions;
