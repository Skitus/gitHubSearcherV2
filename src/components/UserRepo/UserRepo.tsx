import { Col, Row, Spin, Typography } from 'antd';
import React from 'react';
import { IUserRepo } from '../../types/User.types';
import './UserRepo.scss';

interface UsersRepoProps {
    userRepo: IUserRepo[]
    isLoading: boolean,
}

const UserRepo = ({ userRepo, isLoading }: UsersRepoProps) => (
  <>
    {
            isLoading
              ? <Spin size="large" />
              : userRepo.map((repo, index) => (
                <Typography.Link href={repo.html_url} target="_blank" key={repo.html_url}>
                  <Row className="repos-user" justify="space-between" align="middle">
                    <Col>
                      <Typography.Text>{repo.name}</Typography.Text>
                    </Col>
                    <Col>
                      <Typography.Paragraph>
                        Forks
                        {repo.forks_count}
                      </Typography.Paragraph>
                      <Typography.Text>
                        Stars
                        {repo.stargazers_count}
                      </Typography.Text>
                    </Col>
                  </Row>
                </Typography.Link>
              ))
        }
  </>
);

export default UserRepo;
