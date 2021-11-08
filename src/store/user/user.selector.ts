import { createSelector } from 'reselect';

export const selectUser = (state: {user: object}): object => state.user;

export const selectUserData = createSelector(
  selectUser,
  (user: any) => user.data,
);

export const selectUserIsLoading = createSelector(
  selectUser,
  (user: any) => user.isLoading,
);
