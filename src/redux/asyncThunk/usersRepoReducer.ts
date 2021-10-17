import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import http from '../../dal/http';


export const fetchGetUsersRepo:any = createAsyncThunk(
    'usersRepo/fetchGetUsersRepo',
    async (users:string ) => {
        const res = await http.getAllUsersRepos(users);
        return res;
    });


export  const usersRepoReducer = createSlice({
    name:'getUsers',
    initialState:{
        usersRepo:[],
        status:true,
    },
    reducers:{},

    extraReducers: {
        [fetchGetUsersRepo.pending]: (state, action) => {
            state.status = true;
        },
        [fetchGetUsersRepo.fulfilled]: (state, action) => {
            state.usersRepo = action.payload;
            state.status = false;
        },
        [fetchGetUsersRepo.rejected]: (state, action) => {
            state.status = true;
        },
    },
});

export default usersRepoReducer.reducer;