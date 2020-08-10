/*
 * @Author: yangzonglong
 * @Date: 2020-07-17 14:26:46
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-17 14:38:37
 * @Auditor: 
 */ 
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tabs from './Tabs';

const tabs = [
  { id: '1', label: 'tab1' },
  { id: '2', label: 'tab2' }

]
test('tabs', () => {
  let curTabId = tabs[0].id;

  const onChange = jest.fn();
  const { getByText } = render(<Tabs onChange={onChange} curTabId={curTabId} tabs={tabs}/>);

  fireEvent.click(getByText(tabs[1].label));
  expect(onChange.mock.calls[0][0]).toBe(tabs[1].id)
})