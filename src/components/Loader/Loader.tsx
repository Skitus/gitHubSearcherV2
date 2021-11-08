import React from 'react';
import { Skeleton } from 'antd';

interface LoaderProps {
    isLoading: boolean,
    perPage: number
}

const Loader = ({ isLoading, perPage }: LoaderProps): any => (
  Array(perPage).fill(
    <Skeleton loading={isLoading} active avatar={{ shape: 'square', size: 110 }} paragraph={{ rows: 2 }} />,
  )
);

export default Loader;
