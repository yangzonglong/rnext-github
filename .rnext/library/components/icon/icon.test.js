/*
 * @Author: yangzonglong
 * @Date: 2020-05-25 09:50:37
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-05-25 16:07:50
 * @Auditor: 
 */ 
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Icon from './Icon';

const ICON = '&#xe6c7;';

test('icon', () => {
  const { container, rerender } = render(<Icon icon={ICON}/>);
  expect(container.querySelector('span')).toBeTruthy();

  rerender(<Icon icon={ICON} theme='success'/>);
  expect(container.querySelector('.success')).toBeTruthy();

  let clickFlag = false, onClick = () => { clickFlag = true };
  rerender(<Icon icon={ICON} onClick={onClick}/>);
  fireEvent.click(container.querySelector('span'));
  expect(clickFlag).toBeTruthy();

  rerender(<Icon icon={ICON} className='jestClass'/>);
  expect(container.querySelector('.jestClass')).toBeTruthy();
})