import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { Col, Form, Input, Pagination, Row, Spin } from 'antd';
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
  const [perPage, setPerPage] = useState(1);
  const total = usersRequest.users.total_count;

  React.useEffect(() => {
    dispatch(fetchUsers({ userName, perPage }));
  }, [userName, perPage]);

  React.useEffect(() => {
    if (usersRequest.users) {
      dispatch(fetchUsersRepo(usersRequest.users.items));
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
      <Col xs={23} sm={23} md={23} lg={11} xl={11} xxl={11} className="left-side">
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
                  <Pagination
                    onChange={(value) => setPerPage(value)}
                    pageSize={50}
                    total={total}
                    current={perPage}
                  />
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
      <Col xs={23} sm={23} md={23} lg={11} xl={11} xxl={11} className="right-side">
        <DetailRoute />
      </Col>
    </Row>
  );
};

export default Home;
