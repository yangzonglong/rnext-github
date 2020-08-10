/*
 * @Author: yangzonglong
 * @Date: 2020-05-29 09:37:03
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-05-29 09:49:54
 * @Auditor: 
 */ 
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

test('button 是否可点击', () => {  
  let clickFlag = false, onClick = () => { clickFlag = true };
  const { rerender, container } = render(<Button.Create onClick={onClick}/>);
  fireEvent.click(container.querySelector('button'));
  expect(clickFlag).toBeTruthy();
})

test('短时间内是否可重复点击', () => {  
  let count = 0;
  async function onClick(){
    count++
  }
  const { rerender, container } = render(<Button.Create onClick={onClick}/>);
  fireEvent.click(container.querySelector('button'));
  fireEvent.click(container.querySelector('button'));
  expect(count).toBe(1);
})