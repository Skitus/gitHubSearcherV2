import { createSelector } from 'reselect';

export const usersReposSelector = createSelector(
  (state: any) => state,
  (state) => state.usersRepos,
);
