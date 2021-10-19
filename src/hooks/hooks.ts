import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useRouteMatch} from 'react-router-dom';
import {usersSelector} from '../store/users/users.selector';
import {usersReposSelector} from '../store/usersRepos/usersRepo.selector';
import {userSelector} from '../store/user/user.selector';
import { userRepoSelector } from '../store/userRepo/userRepo.selector';

export const useHomeData = () => {
    let match = useRouteMatch();
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const {users, isLoading} = useSelector(usersSelector);
    const {usersRepo} = useSelector(usersReposSelector);

    return {match, userName, setUserName, users, isLoading, usersRepo, dispatch};
}

export const useDetailData = () => {
    const dispatch = useDispatch();
    let {userName} = useParams<{userName: string}>();
    const [repos, setRepos] = useState('');
    const {user, isLoading} = useSelector(userSelector);
    const { userRepo } = useSelector(userRepoSelector);

    return {userName, setRepos, dispatch, repos, user, isLoading, userRepo};
}


