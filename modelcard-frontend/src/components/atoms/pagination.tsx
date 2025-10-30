import React from 'react';
import { Pagination } from 'antd';

const pagination = (): React.ReactNode => (
  <Pagination current={1} total={50} pageSize={10} />
);

export default pagination;
