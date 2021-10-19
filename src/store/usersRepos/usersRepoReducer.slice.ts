import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import gitHubService from '../../dal/http';


export const fetchGetUsersRepo:any = createAsyncThunk(
    'usersRepo/fetchGetUsersRepo',
    async (users) => {
        const res = await gitHubService.getAllUsersRepos(users);
        return res;
    });


export  const usersRepoReducerSlice = createSlice({
    name:'getUsers',
    initialState:{
        usersRepo:[],
        isLoading:true,
    },
    reducers:{},

    extraReducers: {
        [fetchGetUsersRepo.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchGetUsersRepo.fulfilled]: (state, action) => {
            state.usersRepo = action.payload;
            state.isLoading = false;
        },
        [fetchGetUsersRepo.rejected]: (state, action) => {
            state.isLoading = true;
        },
    },
});

export default usersRepoReducerSlice.reducer;