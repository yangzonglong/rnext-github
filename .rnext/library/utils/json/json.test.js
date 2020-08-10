/*
 * @Author: yangzonglong
 * @Date: 2020-07-17 14:09:36
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-17 14:16:16
 * @Auditor: 
 */ 
import { parse, stringify } from './json';

test('json', () => {
  const strToObj = parse('{ "name": "yzl" }');
  expect(strToObj.name).toBe('yzl');

  const strToObj1 = parse('{', {});
  expect(strToObj1).toBeTruthy();

  const obj = { name: 'yzl' };
  const objToStr = stringify(obj);
  expect(objToStr).toBe(JSON.stringify(obj));
})