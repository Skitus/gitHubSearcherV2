import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { Col, Form, Image, Input, Row, Spin, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserRepo } from '../../store/userRepo/userRepo.slice';
import { fetchUser } from '../../store/user/user.slice';
import { userSelector } from '../../store/user/user.selector';
import { userRepoSelector } from '../../store/userRepo/userRepo.selector';
import User from '../User/User';
import UserRepo from '../UserRepo/UserRepo';
import './Detail.scss';

function Detail() {
  const dispatch = useDispatch();
  const { userName } = useParams<{userName: string}>();
  const [repos, setRepos] = useState('');
  const userRequest = useSelector(userSelector);
  const userRepoRequest = useSelector(userRepoSelector);

  React.useEffect(() => {
    dispatch(fetchUserRepo({ userName, repos }));
  }, [userName, repos]);

  React.useEffect(() => {
    dispatch(fetchUser(userName));
  }, [userName]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepos(event.target.value);
  };

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 500),
    [repos],
  );

  return (
    <>
      <Row justify="center" align="top" gutter={20}>
        <User user={userRequest.user} isLoading={userRequest.isLoading} />
      </Row>
      <Form>
        <Form.Item>
          <Input placeholder="Search for Repos" onChange={debouncedChangeHandler} />
        </Form.Item>
      </Form>

      <UserRepo userRepo={userRepoRequest.userRepo} isLoading={userRepoRequest.isLoading} />
    </>
  );
}

export default Detail;
