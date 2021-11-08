import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';
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
  const userRepoBlock = React.useRef<HTMLHeadingElement>(null);

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

  const handleScroll = (event: any) => {
    if (repoIsLoading === false) {
      // eslint-disable-next-line prefer-const
      let { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
      if (Math.floor(scrollHeight - scrollTop) < (clientHeight + (scrollHeight * 0.2))
          && currentPageUserRepo < pagesCount) {
        event.currentTarget.scrollTop = (clientHeight
            + (scrollHeight * (0.2 * currentPageUserRepo)));
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
        className={classnames(
          repoIsLoading ? 'userRepo-non-scroll' : 'userRepo-scroll',
        )}
        ref={userRepoBlock}
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
