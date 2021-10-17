import React, {useCallback} from 'react';
import debounce from 'lodash.debounce';
import {Col, Form, Input, Row, Typography} from 'antd';
import {useDetailData} from '../../hooks/hooks';
import {fetchGetUser} from '../../redux/asyncThunk/userReducer';
import {fetchGetUserRepo} from '../../redux/asyncThunk/userRepoReducer';
import './Detail.css';

function Detail() {
    const {userName, setRepos, dispatch, repos, userRepo, status, user} = useDetailData();

    React.useEffect(() => {
        dispatch(fetchGetUser(userName));
        /*        dispatch(fetchGetUserRepo({userName, repos}));*/
    }, [userName]);

    React.useEffect(() => {
        dispatch(fetchGetUserRepo(user));
    }, [user]);

    /*    console.log("repos user", userRepo);
        console.log("userName", userName);
        console.log("repos", repos);*/


    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepos(event.target.value);
    };

    const filteredRepos = userRepo.filter((rep: any) => {
        return rep.name.toLowerCase().includes(repos.toLowerCase());
    });

    const debouncedChangeHandler = useCallback(
        debounce(changeHandler, 300)
        , [repos]);

    return (
        <div className="right-sidebar">
            <Row justify='center' align='top'>
                <Col>
                    <img src={user.avatar_url} className='avatar-user'/>
                </Col>
                <Col>
                    <Typography className="bio-text">
                        <Typography.Paragraph>{user.login}</Typography.Paragraph>
                        <Typography.Paragraph>{user.email}</Typography.Paragraph>
                        <Typography.Paragraph>{user.location}</Typography.Paragraph>
                        <Typography.Paragraph>{user.created_at}</Typography.Paragraph>
                        <Typography.Paragraph>{user.bio}</Typography.Paragraph>
                        <Typography.Paragraph>Followers: {user.followers}</Typography.Paragraph>
                        <Typography.Paragraph>Following: {user.following}</Typography.Paragraph>
                    </Typography>
                </Col>
            </Row>
            <Form>
                <Form className="search">
                    <Form.Item
                        name='search'
                    >
                        <Input placeholder='Search for Repos' onChange={debouncedChangeHandler}/>
                    </Form.Item>
                </Form>
            </Form>
            <div>
                {
                    status ?
                        <p>Loading... </p> :
                        filteredRepos?.map((repo: { name: string, forks_count: number, stargazers_count: number, html_url: string }) =>
                            <a href={repo.html_url} target="_blank">
                                <Row justify='space-between' align='middle' className='repos-user'>
                                    <Col>
                                        <Typography.Text>{repo.name}</Typography.Text>
                                    </Col>
                                    <Col>
                                        <Typography.Text>Forks {repo.forks_count}</Typography.Text>
                                        <br/>
                                        <Typography.Text>Stars {repo.stargazers_count}</Typography.Text>
                                    </Col>
                                </Row>
                            </a>)
                }
            </div>
        </div>);
}

export default Detail;