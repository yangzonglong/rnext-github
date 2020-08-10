/*
 * @Author: yangzonglong
 * @Date: 2020-05-11 11:27:48
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-05-25 17:27:53
 * @Auditor: 
 */
import React from 'react';
import { render } from '@testing-library/react';
import Loading from './Loading';

test('loading', () => {
  const { container, rerender } = render(<Loading visible/>);
  expect(container.querySelector('div')).toBeTruthy();

  rerender(<Loading visible={false}/>);
  expect(container.querySelector('div')).toBeFalsy();
})