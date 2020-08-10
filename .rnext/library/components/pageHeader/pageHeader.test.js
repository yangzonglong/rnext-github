/*
 * @Author: yangzonglong
 * @Date: 2020-07-06 09:46:32
 * @version: v1.0.0
 * @Descripttion: pageHeader 测试文件
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-06 14:07:32
 * @Auditor: 
 */ 
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PageHeader from './PageHeader';
import history from './../../app/history';

const MOCK_TITLE = 'PageHeaderTtitle';
const MOCK_PATH = '/demo/table';

test('pageHeader', () => {

  const { container, rerender, getByText } = render(<PageHeader title={MOCK_TITLE}/>);
  expect(getByText(MOCK_TITLE)).toBeTruthy();

  history.location.pathname = MOCK_PATH;
  render(<PageHeader/>);
  expect(getByText(MOCK_PATH)).toBeTruthy();
})