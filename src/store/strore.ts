import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.slice';
import userRepoReducer from './userRepo/userRepo.slice';
import usersReducer from './users/users.slice';
import usersRepoReducer from './usersRepos/usersRepo.slice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    userRepo: userRepoReducer,
    usersRepos: usersRepoReducer,
  },
});

export default store;
