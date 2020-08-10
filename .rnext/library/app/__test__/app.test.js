/*
 * @Author: yangzonglong
 * @Date: 2020-07-06 14:49:39
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-06 15:53:18
 * @Auditor: 
 */ 
import React from 'react';
import App from './../App';
import { render, fireEvent } from '@testing-library/react';

test('App render', () => {
  render(<App/>);
})