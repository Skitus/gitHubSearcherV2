import { createSelector } from 'reselect';

export const userRepoSelector = createSelector(
  (state: any) => state,
  (state) => state.userRepo,
);
