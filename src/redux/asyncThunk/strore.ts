import {configureStore} from '@reduxjs/toolkit';
import usersReducer from './usersReducer';
import userReducer from './userReducer';
import userRepoReducer from "./userRepoReducer";
import usersRepoReducer from "./usersRepoReducer";

export const store = configureStore({
    reducer:{
        users:usersReducer,
        user:userReducer,
        userRepo:userRepoReducer,
        usersRepos:usersRepoReducer,
    },
});

export default store;