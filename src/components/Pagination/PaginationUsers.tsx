import React from 'react';
import { Button, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { createPages } from './createPages';
import { setCurrentPageUsers } from '../../store/users/users.slice';

interface PaginationProps{
    currentPage: number,
    pagesCount: number,
}

const PaginationUsers = ({ currentPage, pagesCount }: PaginationProps) => {
  const dispatch = useDispatch();
  const pages: any = [];
  createPages(pages, pagesCount, currentPage);
  return (
    <Row>
      {pages.map((page: any) => (
        <Button
          key={page}
          onClick={() => dispatch(setCurrentPageUsers(page))}
        >
          {page}
        </Button>
      ))}
      <span>&hellip;</span>
      <Button className="page" onClick={() => dispatch(setCurrentPageUsers(pagesCount))}>{pagesCount}</Button>
    </Row>
  );
};

export default PaginationUsers;
