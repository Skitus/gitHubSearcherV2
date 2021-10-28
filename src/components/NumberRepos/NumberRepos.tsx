import React from 'react';
import { Typography } from 'antd';
import { UsersRepos } from '../../types/User.types';
import './NumberRepos.scss';

interface UsersReposProps {
    usersRepo: UsersRepos[]
}

const NumberRepos = ({ usersRepo }: UsersReposProps): any => (
  (usersRepo.map((repo) => (
    <div key={repo.id} className="blockRepos">
      <Typography.Paragraph className="repo-number">
        Repo:
        {' '}
        {repo.length}
      </Typography.Paragraph>
    </div>
  )))
);

export default NumberRepos;
