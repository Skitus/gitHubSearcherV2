import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import gitHubService from '../../dal/http';

export const fetchGetUserRepo:any = createAsyncThunk(
    'user/fetchGetUserRepo',
    // @ts-ignore
    async ({userName, repos}) => {
        const res = await gitHubService.getUserRepos(userName, repos);
        return res;
    });


export  const userReducerRepo = createSlice({
    name:'getUsers',
    initialState:{
        userRepo:[],
        isLoading:true,
    },

    reducers:{

    },
    extraReducers: {
        [fetchGetUserRepo.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchGetUserRepo.fulfilled]: (state, action) => {
            state.userRepo = action.payload;
            state.isLoading = false;
        },
        [fetchGetUserRepo.rejected]: (state, action) => {
            state.isLoading = true;
        },
    },
});

export default userReducerRepo.reducer;