import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import gitHubService from '../../dal/http';

export const fetchGetUsers:any = createAsyncThunk(
    'users/fetchGetUsers',
    async (userName:string ) => {
        const res = await gitHubService.getAllUsers(userName);
        return res;
    });


export  const usersReducerSlice = createSlice({
    name:'getUsers',
    initialState:{
        users:[],
        isLoading:true,
    },
    reducers:{},

    extraReducers: {
        [fetchGetUsers.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchGetUsers.fulfilled]: (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
        },
        [fetchGetUsers.rejected]: (state, action) => {
            state.isLoading = true;
        },
    },
});

export default usersReducerSlice.reducer;