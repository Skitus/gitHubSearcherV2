import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

export const useHomeData = () => {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const {users, status} = useSelector((state:any) => state.users);
    const {usersRepo} = useSelector((state: any) => state.usersRepos);

    return {userName, setUserName, users, status, usersRepo, dispatch};
}


export const useDetailData = () => {
    const dispatch = useDispatch();
    let {userName} = useParams<{userName: string}>();
    const [repos, setRepos] = useState('');
    const {user, status} = useSelector((state:any) => state.user);
    const { userRepo } = useSelector((state:any)=>state.userRepo);

    return {userName, setRepos, dispatch, repos, user, status, userRepo};
}


