import React from 'react';
import { Spin, Typography } from 'antd';
import { IUsersRepo } from '../../types/User.types';
import './UsersRepos.scss';

interface UsersReposProps {
    isLoading: boolean,
    usersRepo: IUsersRepo[]
}

const UsersRepos = ({ isLoading, usersRepo }: UsersReposProps) => (
  <>
    {
    isLoading
      ? <Spin size="large" />
      : usersRepo.map((repo) => (
        <div key={repo.id} className="blockRepos">
          <Typography.Paragraph className="repo-number">
            Repo:
            {' '}
            {repo.length}
          </Typography.Paragraph>
        </div>
      ))
    }
  </>
);

export default UsersRepos;
