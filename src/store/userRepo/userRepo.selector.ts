import { createSelector } from 'reselect';

export const selectUsers = (state: any) => state.userRepo;

export const selectUserRepoData = createSelector(
  selectUsers,
  (state) => state.data,
);

export const selectUserRepoIsLoading = createSelector(
  selectUsers,
  (state) => state.isLoading,
);

export const selectUserRepoCurrentPage = createSelector(
  selectUsers,
  (state) => state.currentPage,
);

export const selectUserRepoTotalCount = createSelector(
  selectUsers,
  (state) => state.total_count,
);

export const selectUserRepoPerPage = createSelector(
  selectUsers,
  (state) => state.per_page,
);