import { createSelector } from 'reselect';

export const selectUserRepo = (state: any) => state.userRepo;

export const selectUserRepoData = createSelector(
  selectUserRepo,
  (state) => state.data,
);

export const selectUserRepoIsLoading = createSelector(
  selectUserRepo,
  (state) => state.isLoading,
);

export const selectUserRepoCurrentPage = createSelector(
  selectUserRepo,
  (state) => state.currentPage,
);

export const selectUserRepoTotalCount = createSelector(
  selectUserRepo,
  (state) => state.total_count,
);

export const selectUserRepoPerPage = createSelector(
  selectUserRepo,
  (state) => state.per_page,
);
