import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import http from '../../dal/http';



export const fetchGetUserRepo:any = createAsyncThunk(
    'user/fetchGetUserRepo',
/*    async ({userName, repos}) => {
        debugger;
        const res = await http.getUserRepos(userName, repos);
        return res;
    });*/
    async (user) => {
        const res = await http.getUserRepos(user);
        return res;
    });


export  const userReducerRepo = createSlice({
    name:'getUsers',
    initialState:{
        userRepo:[],
        status:true,
    },

    reducers:{

    },
    extraReducers: {
        [fetchGetUserRepo.pending]: (state, action) => {
            state.status = true;
        },
        [fetchGetUserRepo.fulfilled]: (state, action) => {
            state.userRepo = action.payload;
            state.status = false;
        },
        [fetchGetUserRepo.rejected]: (state, action) => {
            state.status = true;
        },
    },
});

export default userReducerRepo.reducer;