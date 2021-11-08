import React from 'react';
import { Button, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { createPages } from './createPages';
import { setCurrentPageUsers } from '../../store/users/users.slice';
import './Pagination.scss';

interface PaginationProps{
    currentPage: number,
    pagesCount: number,
}

const PaginationUsers = ({ currentPage, pagesCount }: PaginationProps) => {
  const dispatch = useDispatch();
  const pages: number[] = [];
  const FIRST_PAGE = 1;
  createPages(pages, pagesCount, currentPage);
  return (
    <Row justify="center" align="middle">
      {currentPage >= 5 ? (
        <>
          <Button
            className="pages-items"
            onClick={() => dispatch(setCurrentPageUsers(FIRST_PAGE))}
          >
            {FIRST_PAGE}
          </Button>
          <span className="three-dot">&hellip;</span>
        </>
      ) : ('')}
      {pages.map((page: any) => (
        <Button
          className={`${currentPage === page ? 'active' : 'pages-items'}`}
          key={page}
          onClick={() => dispatch(setCurrentPageUsers(page))}
        >
          {page}
        </Button>
      ))}
      <span>&hellip;</span>
      <Button
        className="pages-items"
        onClick={() => dispatch(setCurrentPageUsers(pagesCount))}
      >
        {pagesCount}
      </Button>
    </Row>
  );
};

export default PaginationUsers;
