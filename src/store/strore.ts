import { configureStore } from '@reduxjs/toolkit';
import users from './users/users.slice';
import userRepo from './userRepo/userRepo.slice';
import usersRepos from './usersRepos/usersRepo.slice';
import user from './user/user.slice';

export const store = configureStore({
  reducer: {
    users,
    user,
    userRepo,
    usersRepos,
  },
});

export default store;
