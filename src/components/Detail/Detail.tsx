import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { Form, Input, Pagination, Row, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserRepo } from '../../store/userRepo/userRepo.slice';
import { fetchUser } from '../../store/user/user.slice';
import { userSelector } from '../../store/user/user.selector';
import { userRepoSelector } from '../../store/userRepo/userRepo.selector';
import UserProfile from '../UserProfile/UserProfile';
import UserProfileRepos from '../UserProfileRepos/UserProfileRepos';
import './Detail.scss';

function Detail() {
  const dispatch = useDispatch();
  const { userName } = useParams<{userName: string}>();
  const [repos, setRepos] = useState('');
  const userRequest = useSelector(userSelector);
  const userRepoRequest = useSelector(userRepoSelector);
  const [perPage, setPerPage] = useState(1);
  const total = Math.ceil(userRepoRequest?.userRepo?.total_count) > 1000 ? 20
    : Math.ceil(userRepoRequest?.userRepo?.total_count);

  React.useEffect(() => {
    dispatch(fetchUserRepo({ userName, repos, perPage }));
  }, [userName, repos, perPage]);

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
        <UserProfile user={userRequest.user} isLoading={userRequest.isLoading} />
      </Row>
      <Form>
        <Form.Item>
          <Input placeholder="Search for Repos" onChange={debouncedChangeHandler} />
        </Form.Item>
      </Form>
      <UserProfileRepos
        userRepo={userRepoRequest.userRepo}
        isLoading={userRepoRequest.isLoading}
      />
      {
            userRepoRequest.isLoading
              ? <Spin size="large" className="spiner" />
              : (
                <Pagination
                  onChange={(value) => setPerPage(value)}
                  pageSize={5}
                  total={total}
                  current={perPage}
                />
              )
        }
    </>
  );
}

export default Detail;
