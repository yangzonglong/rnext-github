/*
 * @Author: yangzonglong
 * @Date: 2020-07-06 16:01:20
 * @version: v1.0.0
 * @Descripttion: layout 测试
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-17 11:07:16
 * @Auditor: 
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './../Layout';
import mockUserInfo from './../../../utils/routePermit/__test__/mockUserInfo';
import { findCurrAppMenus, getCurPathInGroupKey } from './../util';

const MOCK_APPID = 'expole';
const MOCK_PATHNAME = '/expole/demo';

window.sessionStorage.setItem('userInfo', JSON.stringify(mockUserInfo));

test('layout util', () => {

  const appMenus = findCurrAppMenus(MOCK_APPID, window.$app.t);
  expect(appMenus.length).toBe(1);

  const activeKey = getCurPathInGroupKey(MOCK_PATHNAME, appMenus);
  expect(activeKey).toBe('0');
})

test('layout', async () => {
  const { rerender, container } = render(<Layout />);

  // 测试 appName 是否显示
  expect(container.querySelector('h1').innerHTML).toBe('appName');
  
  // 测试菜单是否正常显示
  expect(container.querySelectorAll('.ant-menu').length).toBeTruthy();
})