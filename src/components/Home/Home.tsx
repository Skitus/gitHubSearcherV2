import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { Col, Form, Input, Row, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DetailRoute } from '../../routes/Routes';
import Title from '../Title/Title';
import { usersSelector } from '../../store/users/users.selector';
import { usersReposSelector } from '../../store/usersRepos/usersRepo.selector';
import { fetchUsers } from '../../store/users/users.slice';
import { fetchUsersRepo } from '../../store/usersRepos/usersRepo.slice';
import AllUsers from '../Users/Users';
import NumberRepos from '../NumberRepos/NumberRepos';
import './Home.scss';

const Home = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const usersRequest = useSelector(usersSelector);
  const usersReposRequest = useSelector(usersReposSelector);

  React.useEffect(() => {
    dispatch(fetchUsers(userName));
  }, [userName]);

  React.useEffect(() => {
    if (usersRequest.users) {
      dispatch(fetchUsersRepo(usersRequest.users));
    }
  }, [usersRequest.users]);

  const changeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const debouncedChangeHandler = useCallback(
    debounce(changeUserName, 500), [userName],
  );

  return (
    <Row justify="space-around" align="top">
      <Col span={11}>
        <Title />
        <Form>
          <Form.Item>
            <Input placeholder="Search for Users" onChange={debouncedChangeHandler} />
          </Form.Item>
        </Form>
        {
          usersReposRequest.isLoading
            ? <Spin size="large" className="spiner" />
            : (
              <Row justify="space-between" align="top">
                <Col>
                  <AllUsers isLoading={usersRequest.isLoading} users={usersRequest.users} />
                </Col>
                <Col>
                  <NumberRepos
                    usersRepo={usersReposRequest.usersRepo}
                  />
                </Col>
              </Row>
            )
        }
      </Col>
      <Col span={11}>
        <DetailRoute />
      </Col>
    </Row>
  );
};

export default Home;
