import React from 'react';
import { Image, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Users } from '../../types/User.types';
import { clearData } from '../../store/userRepo/userRepo.slice';
import './Users.scss';

interface UsersProps {
    users: Users[]
}

const AllUsers = ({ users }: UsersProps): any => {
  const dispatch = useDispatch();
  const handleClearData = () => {
    dispatch(clearData());
  };
  return (
    (users.map((obj) => (
      <Link to={obj.login} key={obj.id} onClick={() => handleClearData()}>
        <Row className="users" justify="space-between" align="middle" key={obj.id}>
          <Image
            width={100}
            height={100}
            src={obj.avatar_url}
          />
          <Typography.Text strong>{obj.login}</Typography.Text>
        </Row>
      </Link>
    )))
  );
};

export default AllUsers;
