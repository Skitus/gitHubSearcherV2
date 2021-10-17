import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import http from '../../dal/http';

export const fetchGetUsers:any = createAsyncThunk(
    'users/fetchGetUsers',
    async (userName:string ) => {
        const res = await http.getAllUsers(userName);
        return res;
    });


export  const usersReducer = createSlice({
    name:'getUsers',
    initialState:{
        users:[],
        status:true,
    },
    reducers:{},

    extraReducers: {
        [fetchGetUsers.pending]: (state, action) => {
            state.status = true;
        },
        [fetchGetUsers.fulfilled]: (state, action) => {
            state.users = action.payload;
            state.status = false;
        },
        [fetchGetUsers.rejected]: (state, action) => {
            state.status = true;
        },
    },
});

export default usersReducer.reducer;