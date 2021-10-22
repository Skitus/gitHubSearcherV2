import React from 'react';
import { Image, Row, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { IUsers } from '../../types/User.types';
import './Users.scss';

interface UsersProps {
    users: IUsers[],
    isLoading: boolean
}

const Users = ({ isLoading, users }: UsersProps) => (
  <>
    {
        isLoading
          ? <Spin size="large" />
          : (users.map((obj) => (
            <Link to={`${obj.login}`} key={obj.id}>
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
    }
  </>
);

export default Users;
