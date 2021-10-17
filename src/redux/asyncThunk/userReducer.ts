import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import http from '../../dal/http';


export const fetchGetUser:any = createAsyncThunk(
    'user/fetchGetUser',
    async (login:string ) => {
        const res = await http.getUserById(login);
        return res;
    });


export  const userReducer = createSlice({
    name:'getUsers',
    initialState:{
        user:[],
        isLoading:true,
    },
    reducers:{

    },

    extraReducers: {
        [fetchGetUser.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchGetUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        [fetchGetUser.rejected]: (state, action) => {
            state.isLoading = true;
        },
    },
});

export default userReducer.reducer;