import React from 'react';
import { Typography } from 'antd';
import { UsersRepos } from '../../types/User.types';
import './NumberRepos.scss';

interface UsersReposProps {
    usersRepo: UsersRepos[]
}

const NumberRepos = ({ usersRepo }: UsersReposProps): any => (
  (usersRepo.map((repo) => (
    <div className="block-repos" key={repo.id}>
      <Typography.Paragraph className="repo-number" strong>
        Repo:
        {' '}
        {repo.length}
      </Typography.Paragraph>
    </div>
  )))
);

export default NumberRepos;
