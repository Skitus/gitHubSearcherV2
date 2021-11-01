import { createSelector } from 'reselect';

const selectUsersRepos = (state: any) => state.usersRepos;

export const selectUsersRepositories = createSelector(
  selectUsersRepos,
  (state) => state.usersRepo,
);
export const selectUsersRepoIsLoading = createSelector(
  selectUsersRepos,
  (state) => state.isLoading,
);
