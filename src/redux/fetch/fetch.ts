/*
import http from '../../dal/http';
import {setUser, setUserRepos, setUsers, setUsersRepos} from '../actions/actions';

export const fetchUsers = (login: string) => async (dispatch: any) => {
    const result = await http.getAllUsers(login);
    if (result) {
        dispatch(setUsers(result));
    }
};

export const fetchUser = (login: string) => async (dispatch: any) => {
    const result = await http.getUserById(login);
    if (result) {
        dispatch(setUser(result));
    }
};

export const fetchReposUsers = (login: string) => async (dispatch: any) => {

    const users = await http.getAllUsers(login);
    const repos = await http.getAllUsersRepos(users);
    dispatch(setUsersRepos(repos));
};

export const fetchReposUser = (login: string) => async (dispatch: any) => {
    const user = await http.getUserById(login);
    const result = await http.getAllUserRepos(user);
    dispatch(setUserRepos(result));
};*/

export {};
