import React from 'react';
import { Spin, Typography } from 'antd';
import { UsersRepos } from '../../types/User.types';
import './NumberRepos.scss';

interface UsersReposProps {
    isLoading: boolean,
    usersRepo: UsersRepos[]
}

const NumberRepos = ({ isLoading, usersRepo }: UsersReposProps) => (
  <>
    {isLoading
      ? <Spin size="large" />
      : usersRepo.map((repo) => (
        <div key={repo.id} className="blockRepos">
          <Typography.Paragraph className="repo-number">
            Repo:
            {' '}
            {repo.length}
          </Typography.Paragraph>
        </div>
      ))}
  </>
);

export default NumberRepos;
