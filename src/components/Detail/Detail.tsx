import React, {useCallback} from 'react';
import debounce from 'lodash.debounce';
import {Col, Form, Image, Input, Row, Spin, Typography} from 'antd';
import {useDetailData} from '../../hooks/hooks';
import {fetchGetUser} from '../../redux/asyncThunk/userReducer';
import {fetchGetUserRepo} from '../../redux/asyncThunk/userRepoReducer';
import './Detail.css';

function Detail() {
    const {userName, setRepos, dispatch, repos, userRepo, status, user} = useDetailData();

    React.useEffect(() => {
        dispatch(fetchGetUser(userName));
        dispatch(fetchGetUserRepo({userName, repos}));
    }, [userName, repos]);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepos(event.target.value);
    };

    const debouncedChangeHandler = useCallback(
        debounce(changeHandler, 1000)
        , [repos]);

    return (
        <>
            <Row justify='center' align='top' gutter={20}>
                <Col>
                    <Image
                        width={200}
                        height={200}
                        src={user.avatar_url}
                    />
                </Col>
                <Col>
                    <Typography>
                        <Typography.Paragraph strong>{user.login}</Typography.Paragraph>
                        <Typography.Paragraph strong>{user.email}</Typography.Paragraph>
                        <Typography.Paragraph strong>{user.location}</Typography.Paragraph>
                        <Typography.Paragraph strong>{user.created_at}</Typography.Paragraph>
                        <Typography.Paragraph strong>{user.bio}</Typography.Paragraph>
                        <Typography.Paragraph strong>Followers: {user.followers}</Typography.Paragraph>
                        <Typography.Paragraph strong>Following: {user.following}</Typography.Paragraph>
                    </Typography>
                </Col>
            </Row>
            <Form>
                <Form.Item>
                    <Input placeholder='Search for Repos' onChange={debouncedChangeHandler}/>
                </Form.Item>
            </Form>
            {
                status ?
                    <Spin size="large" /> :
                    userRepo.items?.map((repo: { name: string, forks_count: number, stargazers_count: number, html_url: string }) =>
                        <Typography.Link href={repo.html_url} target="_blank">
                            <Row justify='space-between' align='middle' className='repos-user'>
                                <Col>
                                    <Typography.Text>{repo.name}</Typography.Text>
                                </Col>
                                <Col>
                                    <Typography.Paragraph>Forks {repo.forks_count}</Typography.Paragraph>
                                    <Typography.Text>Stars {repo.stargazers_count}</Typography.Text>
                                </Col>
                            </Row>
                        </Typography.Link>
                    )
            }
        </>
    );
}

export default Detail;