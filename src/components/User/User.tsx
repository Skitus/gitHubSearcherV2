import React from 'react';
import { Col, Image, Spin, Typography } from 'antd';
import { IUser } from '../../types/User.types';
import './User.scss';

interface UserProps {
    user: IUser,
    isLoading: boolean
}

const User = ({ user, isLoading }: UserProps) => (
  <>
    {
    isLoading
      ? <Spin size="large" />
      : (
        <>
          <Col>
            <Image
              width={200}
              height={200}
              src={user.avatar_url}
            />
          </Col>
          <Col>
            <Typography>
              <Typography.Paragraph strong>{user.login}</Typography.Paragraph>
              <Typography.Paragraph strong>{user.email}</Typography.Paragraph>
              <Typography.Paragraph strong>{user.location}</Typography.Paragraph>
              <Typography.Paragraph strong>{user.created_at}</Typography.Paragraph>
              <Typography.Paragraph strong>{user.bio}</Typography.Paragraph>
              <Typography.Paragraph strong>
                Followers:
                {user.followers}
              </Typography.Paragraph>
              <Typography.Paragraph strong>
                Following:
                {user.following}
              </Typography.Paragraph>
            </Typography>
          </Col>
        </>
      )
            }
  </>
);

export default User;
