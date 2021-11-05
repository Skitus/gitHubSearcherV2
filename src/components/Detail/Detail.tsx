import React, { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { Col, Form, Input, Row, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearData, fetchUserRepo, setCurrentPageUserRepo } from '../../store/userRepo/userRepo.slice';
import { fetchUser } from '../../store/user/user.slice';
import {
  selectUserRepoCurrentPage,
  selectUserRepoData,
  selectUserRepoIsLoading, selectUserRepoPerPage,
  selectUserRepoTotalCount,
} from '../../store/userRepo/userRepo.selector';
import { selectUserData, selectUserIsLoading } from '../../store/user/user.selector';
import UserProfile from '../UserProfile/UserProfile';
import UserProfileRepos from '../UserProfileRepos/UserProfileRepos';
import './Detail.scss';

// todo change pagination
// todo add offsetheight

const Detail = () => {
  const dispatch = useDispatch();
  const { userName } = useParams<{userName: string}>();
  const [repoName, setRepoName] = useState('');
  const userRepo = useSelector(selectUserRepoData);
  const repoIsLoading = useSelector(selectUserRepoIsLoading);
  const currentPageUserRepo = useSelector(selectUserRepoCurrentPage);
  const user = useSelector(selectUserData);
  const userIsLoading = useSelector(selectUserIsLoading);
  const totalUserRepo = useSelector(selectUserRepoTotalCount);
  const perPageUserRepo = useSelector(selectUserRepoPerPage);
  const pagesCount = Math.ceil(totalUserRepo / perPageUserRepo);

  React.useEffect(() => {
    dispatch(fetchUserRepo({ userName, repoName, currentPageUserRepo }));
  }, [userName, repoName, currentPageUserRepo]);

  React.useEffect(() => {
    dispatch(fetchUser(userName));
  }, [userName]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepoName(event.target.value);
    dispatch(clearData());
  };

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 500),
    [repoName],
  );

  const handleScroll = (event: any) => {
    if (repoIsLoading === false) {
      const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
      if (Math.floor(scrollHeight - scrollTop) === clientHeight
          && currentPageUserRepo < pagesCount) {
        dispatch(setCurrentPageUserRepo(currentPageUserRepo + 1));
      }
    }
  };

  return (
    <>
      <Row justify="center" align="top" gutter={20}>
        <UserProfile user={user} isLoading={userIsLoading} />
      </Row>
      <Form>
        <Form.Item>
          <Input placeholder="Search for Repos" onChange={debouncedChangeHandler} />
        </Form.Item>
      </Form>
      <div className="userRepo" onScroll={handleScroll}>
        <UserProfileRepos
          userRepo={userRepo}
          isLoading={repoIsLoading}
        />
      </div>
    </>
  );
};

export default Detail;
