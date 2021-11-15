import React, { ChangeEvent, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { Col, Form, Input, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DetailRoute } from '../../routes/Routes';
import Title from '../Title/Title';
import {
  usersSelector,
} from '../../store/users/users.selector';
import {
  selectUsersRepoIsLoading,
  selectUsersRepositories,
} from '../../store/usersRepos/usersRepo.selector';
import { fetchUsers } from '../../store/users/users.slice';
import { fetchUsersRepo } from '../../store/usersRepos/usersRepo.slice';
import AllUsers from '../Users/Users';
import NumberRepos from '../NumberRepos/NumberRepos';
import PaginationUsers from '../Pagination/PaginationUsers';
import Loader from '../Loader/Loader';
import { USERS_PER_PAGE } from '../../dal/GitHubService';
import './Home.scss';

const Home = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  // eslint-disable-next-line prefer-const
  let { usersCurrentPage, usersData, usersIsLoading, usersTotalCount } = useSelector(usersSelector);

  const repos = useSelector(selectUsersRepositories);
  const reposIsLoading = useSelector(selectUsersRepoIsLoading);

  usersTotalCount = Math.ceil(usersTotalCount) > 1000 ? 1000 : usersTotalCount;
  const pagesCountUsers = Math.ceil(usersTotalCount / USERS_PER_PAGE);

  React.useEffect(() => {
    dispatch(fetchUsers({ userName, usersCurrentPage }));
  }, [userName, usersCurrentPage]);

  React.useEffect(() => {
    if (!usersIsLoading) {
      dispatch(fetchUsersRepo(usersData));
    }
  }, [usersData, usersIsLoading]);

  const changeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const debounceChangeUserName = useCallback(
    debounce(changeUserName, 500), [userName],
  );

  return (
    <Row justify="space-around" align="top">
      <Col className="left-side" xs={23} sm={23} md={23} lg={11} xl={11} xxl={11}>
        <Title />
        <Form>
          <Form.Item>
            <Input placeholder="Search for Users" onChange={debounceChangeUserName} />
          </Form.Item>
        </Form>
        {
          reposIsLoading
            ? <Loader isLoading={reposIsLoading} perPage={USERS_PER_PAGE} />
            : (
              <Row justify="space-between" align="top">
                <Col>
                  <AllUsers users={usersData} />
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
          currentPage={usersCurrentPage}
          pagesCount={pagesCountUsers}
        />
      </Col>
      <Col className="right-side" xs={23} sm={23} md={23} lg={11} xl={11} xxl={11}>
        <DetailRoute />
      </Col>
    </Row>
  );
};

export default Home;
