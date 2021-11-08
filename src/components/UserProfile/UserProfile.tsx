import React from 'react';
import { Col, Image, Row, Skeleton, Typography } from 'antd';
import { User } from '../../types/User.types';
import './UserProfile.scss';

interface UserProps {
    user: User,
    isLoading: boolean
}

const UserProfile = ({ user, isLoading }: UserProps) => (
  <Row justify="center" align="middle" gutter={20}>
    <Skeleton className="flex" loading={isLoading} active avatar={{ shape: 'square', size: 110 }}>
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
    </Skeleton>
  </Row>
);
export default UserProfile;
