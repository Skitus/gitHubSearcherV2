import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user/userReducer.slice';
import userRepoReducer from './userRepo/userRepoReducer.slice';
import usersReducer from './users/usersReducer.slice';
import usersRepoReducer from './usersRepos/usersRepoReducer.slice';

export const store = configureStore({
    reducer:{
        users:usersReducer,
        user:userReducer,
        userRepo:userRepoReducer,
        usersRepos:usersRepoReducer,
    },
});

export default store;