import React, {useCallback} from 'react';
import debounce from 'lodash.debounce';
import {Col, Form, Image, Input, Row, Spin, Typography} from 'antd';
import {DetailRoute} from '../../routes/Routes';
import {useHomeData} from '../../hooks/hooks';
import { fetchGetUsers } from '../../store/users/usersReducer.slice';
import { fetchGetUsersRepo } from '../../store/usersRepos/usersRepoReducer.slice';
import './Home.css';
import Users from '../Users/Users';
import UsersRepos from '../UsersRepos/UsersRepos';
import Title from '../Title/Title';

const Home = () => {
    const {match, userName, setUserName, isLoading, users, usersRepo, dispatch} = useHomeData();

    React.useEffect(() => {
        dispatch(fetchGetUsers(userName));
    }, [userName]);

    React.useEffect(() => {
        if (users) {
            dispatch(fetchGetUsersRepo(users));
        }
    }, [users]);

    const changeHandler = (event: any) => {
        setUserName(event.target.value);
    };

    const debouncedChangeHandler = useCallback(
        debounce(changeHandler, 500), [userName]);


    return (
        <Row justify='space-around' align='top'>
            <Col span={11}>
                <Title />
                <Form>
                    <Form.Item>
                        <Input placeholder='Search for Users' onChange={debouncedChangeHandler}/>
                    </Form.Item>
                </Form>
                <Row justify='space-between' align='top'>
                    <Col>
                        <Users isLoading={isLoading} users={users} match={match}/>
                    </Col>
                    <Col>
                        <UsersRepos isLoading={isLoading} usersRepo={usersRepo}/>
                    </Col>
                </Row>
            </Col>
            <Col span={11}>
                {
                    isLoading ? <Spin size="large"/> : <DetailRoute/>
                }
            </Col>
        </Row>

    );
};

export default Home;
