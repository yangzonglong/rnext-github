/*
 * @Author: yangzonglong
 * @Date: 2020-07-06 15:54:12
 * @version: v1.0.0
 * @Descripttion: history 测试
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-06 15:59:02
 * @Auditor: 
 */ 
import history from './../history';

const MOCK_ID = '1';

test('history', () => {
  expect(history.push).toBeTruthy();

  history.push('/demo/table?id=' + MOCK_ID);
  const query = history.query;
  expect(history.query.id).toBe(MOCK_ID);
})