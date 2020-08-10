/*
 * @Author: yangzonglong
 * @Date: 2020-05-14 11:17:08
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-05-14 11:18:53
 * @Auditor: 
 */
import routePermit from '../routePermit';
import mockUserInfo from './mockUserInfo';

test('routePermit', () => {

  window.sessionStorage.setItem('userInfo', JSON.stringify(mockUserInfo));
  const permit = routePermit('/expole/demo', 'expole');

  expect(permit.create).toBeTruthy();
  expect(permit.edit).toBeTruthy();
  expect(permit.view).toBeTruthy();
  expect(permit.download).toBeTruthy();
  expect(permit.upload).toBeTruthy();
  expect(permit.delete).toBeFalsy();
  
})