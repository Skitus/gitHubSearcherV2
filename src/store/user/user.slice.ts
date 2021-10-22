import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gitHubService from '../../dal/http';

export const fetchUser:any = createAsyncThunk(
  'user/fetchGetUser',
  async (userName:string) => await gitHubService.getUserById(userName),
);

export const userSlice = createSlice({
  name: 'getUsers',
  initialState: {
    user: [],
    isLoading: true,
  },
  reducers: {

  },

  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [fetchUser.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;
