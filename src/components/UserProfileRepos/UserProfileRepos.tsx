import React from 'react';
import { Col, Row, Spin, Typography } from 'antd';
import { StarOutlined, ForkOutlined } from '@ant-design/icons';
import { UserRepo } from '../../types/User.types';
import './UserProfileRepos.scss';

interface UsersRepoProps {
    userRepo: UserRepo[],
    isLoading: boolean,
}

const UserProfileRepos = ({ userRepo, isLoading }: UsersRepoProps): any => (
  <>
    {userRepo.map((repo) => (
      <Typography.Link href={repo.html_url} target="_blank" key={repo.html_url}>
        <Row className="repos-user" justify="space-between" align="middle">
          <Col>
            <Typography.Text>{repo.name}</Typography.Text>
          </Col>
          <Col>
            <Typography.Paragraph>
              Forks
              <ForkOutlined />
              {' '}
              {repo.forks_count}
            </Typography.Paragraph>
            <Typography.Text>
              Stars
              {' '}
              <StarOutlined />
              {repo.stargazers_count}
            </Typography.Text>
          </Col>
        </Row>
      </Typography.Link>
    ))}
    <Spin spinning={isLoading} size="large" />
  </>
);

export default UserProfileRepos;
