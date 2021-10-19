import {createSelector} from 'reselect';

export const userSelector = createSelector(
    (state: any) => state,
    state => state.user
)