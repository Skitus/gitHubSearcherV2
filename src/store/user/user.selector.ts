import { createSelector } from 'reselect';

export const selectUser = (state: any) => state.user;

export const selectUserData = createSelector(
  selectUser,
  (user) => user.data,
);

export const selectUserIsLoading = createSelector(
  selectUser,
  (user) => user.isLoading,
);
