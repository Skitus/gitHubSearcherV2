import React from 'react';
import { Image, Row, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Users } from '../../types/User.types';
import './Users.scss';

interface UsersProps {
    users: {items: Users[]},
    isLoading: boolean
}

const AllUsers = ({ isLoading, users }: UsersProps): any => (
  isLoading
    ? <Spin size="large" />
    : (users.items.map((obj) => (
      <Link to={obj.login} key={obj.id}>
        <Row className="users" justify="space-between" align="middle" key={obj.id}>
          <Image
            width={100}
            height={100}
            src={obj.avatar_url}
          />
          <Typography.Text strong>{obj.login}</Typography.Text>
        </Row>
      </Link>
    ))
    )
);

export default AllUsers;
