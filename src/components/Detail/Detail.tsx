import React, { SyntheticEvent, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearData, fetchUserRepo, setCurrentPageUserRepo } from '../../store/userRepo/userRepo.slice';
import { fetchUser } from '../../store/user/user.slice';
import {
  selectUserRepoCurrentPage,
  selectUserRepoData,
  selectUserRepoIsLoading,
  selectUserRepoTotalCount,
} from '../../store/userRepo/userRepo.selector';
import { selectUserData, selectUserIsLoading } from '../../store/user/user.selector';
import UserProfile from '../UserProfile/UserProfile';
import UserProfileRepos from '../UserProfileRepos/UserProfileRepos';
import { REPOSITORIES_PER_PAGE } from '../../dal/GitHubService';
import './Detail.scss';

const Detail = () => {
  const dispatch = useDispatch();
  const { userName } = useParams<{userName: string}>();
  const [repoName, setRepoName] = useState('');
  const userRepo = useSelector(selectUserRepoData);
  const repoIsLoading = useSelector(selectUserRepoIsLoading);
  const currentPageUserRepo = useSelector(selectUserRepoCurrentPage);
  const totalUserRepo = useSelector(selectUserRepoTotalCount);
  const user = useSelector(selectUserData);
  const userIsLoading = useSelector(selectUserIsLoading);
  const pagesCount = Math.ceil(totalUserRepo / REPOSITORIES_PER_PAGE);

  React.useEffect(() => {
    dispatch(fetchUserRepo({ userName, repoName, currentPageUserRepo }));
  }, [userName, repoName, currentPageUserRepo]);

  React.useEffect(() => {
    dispatch(fetchUser(userName));
  }, [userName]);

  const changeRepoName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepoName(event.target.value);
    dispatch(clearData());
  };

  const debouncedChangeHandler = useCallback(
    debounce(changeRepoName, 500),
    [repoName],
  );

  const handleScroll = (event: SyntheticEvent) => {
    if (!repoIsLoading) {
      const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
      const isLoadMore = clientHeight + scrollHeight * 0.2 > Math.floor(scrollHeight - scrollTop);
      const isLastPage = currentPageUserRepo < pagesCount;
      if (isLoadMore && isLastPage) {
        dispatch(setCurrentPageUserRepo(currentPageUserRepo + 1));
      }
    }
  };

  return (
    <>
      <UserProfile user={user} isLoading={userIsLoading} />
      <Form>
        <Form.Item>
          <Input placeholder="Search for Repos" onChange={debouncedChangeHandler} />
        </Form.Item>
      </Form>
      <div
        className="user-repo-scroll"
        onScroll={handleScroll}
      >
        <UserProfileRepos
          userRepo={userRepo}
          isLoading={repoIsLoading}
        />
      </div>
    </>
  );
};

export default Detail;
