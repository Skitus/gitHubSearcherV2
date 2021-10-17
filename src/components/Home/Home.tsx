import {Link, useRouteMatch} from 'react-router-dom';
import React, {useCallback} from 'react';
import debounce from 'lodash.debounce';
import {Col, Form, Input, Row, Typography} from 'antd';
import {DetailRoute} from '../../routes/Routes';
import {useHomeData} from '../../hooks/hooks';
import {fetchGetUsers} from '../../redux/asyncThunk/usersReducer';
import {fetchGetUsersRepo} from '../../redux/asyncThunk/usersRepoReducer';
import './Home.css';

const Home = () => {
    let match = useRouteMatch();
    const {value, setValue, status, users, usersRepo, dispatch} = useHomeData();

    React.useEffect(() => {
        dispatch(fetchGetUsers(value));
    }, [value]);

    React.useEffect(() => {
        if(users){
            dispatch(fetchGetUsersRepo(users));
        }
    },[users]);

    const changeHandler = (event: any) => {
        setValue(event.target.value);
    };

    const debouncedChangeHandler = useCallback(
        debounce(changeHandler, 300), [value]);

    return (
        <div className="flex-box">
            <div className="left-sidebar">
                <Typography>
                    <Typography.Title>
                        Git hub searcher
                    </Typography.Title>
                </Typography>
                <Form className="search">
                    <Form.Item name='search'>
                        <Input placeholder='Search for Users' onChange={debouncedChangeHandler}/>
                    </Form.Item>
                </Form>
                <Row justify='space-between' className="block" align='top'>
                    <Col>
                        {
                            status ?
                                <p>loading</p> :
                                (users.items.map((obj: { login: string, avatar_url: string, id: number }) => (
                                            <Link to={`${match.url}${obj.login}`}>
                                                <div key={obj.id} className="img-username">
                                                    <img src={obj.avatar_url} className="img"/>
                                                    <Typography.Text className="user-name">{obj.login}</Typography.Text>
                                                </div>
                                            </Link>
                                        )
                                    )
                                )

                        }
                    </Col>
                    <Col>
                        {
                            status ?
                                <p>loading</p> :
                                usersRepo.map((arr: { id: number, length: Function }) => (
                                    <div key={arr.id} className="blockRepos">
                                        <p className="repo-number">Repo: {arr.length}</p>
                                    </div>)
                                )
                        }
                    </Col>
                </Row>

            </div>
            {
                !status && <DetailRoute/>
            }
        </div>

    );
};

export default Home;
