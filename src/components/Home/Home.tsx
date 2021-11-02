import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { Col, Form, Input, Row, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DetailRoute } from '../../routes/Routes';
import Title from '../Title/Title';
import {
  selectUsersCurrentPage,
  selectUsersData,
  selectUsersIsLoading, selectUsersPerPage,
  selectUsersTotalCount,
} from '../../store/users/users.selector';
import { fetchUsers } from '../../store/users/users.slice';
import { fetchUsersRepo } from '../../store/usersRepos/usersRepo.slice';
import AllUsers from '../Users/Users';
import NumberRepos from '../NumberRepos/NumberRepos';
import { selectUsersRepoIsLoading, selectUsersRepositories } from '../../store/usersRepos/usersRepo.selector';
import PaginationUsers from '../Pagination/PaginationUsers';
import './Home.scss';

const Home = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const users = useSelector(selectUsersData);
  const isLoading = useSelector(selectUsersIsLoading);
  const currentPageUsers = useSelector(selectUsersCurrentPage);
  let total = useSelector(selectUsersTotalCount);
  const repos = useSelector(selectUsersRepositories);
  const reposIsLoading = useSelector(selectUsersRepoIsLoading);
  const usersParam = useSelector(selectUsersPerPage);

  total = Math.ceil(total) > 1000 ? 1000 : total;
  const pagesCountUsers = Math.ceil(total / usersParam);

  React.useEffect(() => {
    dispatch(fetchUsers({ userName, currentPageUsers }));
  }, [userName, currentPageUsers]);

  React.useEffect(() => {
    if (users) {
      dispatch(fetchUsersRepo(users));
    }
  }, [users]);

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
          reposIsLoading
            ? <Spin size="large" className="spiner" />
            : (
              <Row justify="space-between" align="top">
                <Col>
                  <AllUsers isLoading={isLoading} users={users} />
                </Col>
                <Col>
                  <NumberRepos
                    usersRepo={repos}
                  />
                </Col>
              </Row>
            )
        }
        <PaginationUsers
          currentPage={currentPageUsers}
          pagesCount={pagesCountUsers}
        />
      </Col>
      <Col xs={23} sm={23} md={23} lg={11} xl={11} xxl={11} className="right-side">
        <DetailRoute />
      </Col>
    </Row>
  );
};

export default Home;
