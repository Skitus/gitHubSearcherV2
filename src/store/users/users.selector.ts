import { createSelector } from 'reselect';

export const usersSelector = createSelector(
  (state: any) => state,
  (state) => state.users,
);
