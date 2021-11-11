import React, { SyntheticEvent, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearData, fetchUserRepo, setCurrentPageUserRepo } from '../../store/userRepo/userRepo.slice';
import { fetchUser } from '../../store/user/user.slice';
import { userRepoSelector } from '../../store/userRepo/userRepo.selector';
import { selectUserData, selectUserIsLoading } from '../../store/user/user.selector';
import UserProfile from '../UserProfile/UserProfile';
import UserProfileRepos from '../UserProfileRepos/UserProfileRepos';
import { REPOSITORIES_PER_PAGE } from '../../dal/GitHubService';
import './Detail.scss';

const Detail = () => {
  const dispatch = useDispatch();
  const { userName } = useParams<{userName: string}>();
  const [repoName, setRepoName] = useState('');
  const {
    userRepoData,
    userRepoIsLoading,
    userRepoCurrentPage,
    userRepoTotalCount,
  } = useSelector(userRepoSelector);

  const user = useSelector(selectUserData);
  const userIsLoading = useSelector(selectUserIsLoading);

  const pagesCount = Math.ceil(userRepoTotalCount / REPOSITORIES_PER_PAGE);

  React.useEffect(() => {
    dispatch(fetchUserRepo({ userName, repoName, userRepoCurrentPage }));
  }, [userName, repoName, userRepoCurrentPage]);

  React.useEffect(() => {
    dispatch(fetchUser(userName));
  }, [userName]);

  const handlerRepoName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepoName(event.target.value);
    dispatch(clearData());
  };

  const debouncedChangeHandler = useCallback(
    debounce(handlerRepoName, 500),
    [repoName],
  );

  const handleScroll = (event: SyntheticEvent) => {
    if (!userRepoIsLoading) {
      const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
      const isLoadMore = clientHeight + scrollHeight * 0.2 > Math.floor(scrollHeight - scrollTop);
      const isLastPage = userRepoCurrentPage < pagesCount;
      if (isLoadMore && isLastPage) {
        dispatch(setCurrentPageUserRepo(userRepoCurrentPage + 1));
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
          userRepo={userRepoData}
          isLoading={userRepoIsLoading}
        />
      </div>
    </>
  );
};

export default Detail;
