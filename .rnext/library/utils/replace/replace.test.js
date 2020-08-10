/*
 * @Author: yangzonglong
 * @Date: 2020-07-17 13:48:00
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-17 14:08:56
 * @Auditor: 
 */ 
import replace from './replace';

const MOCK_DATA = {
  name: 'demo'
}

test('replace', () => {
  
  const obj = replace(MOCK_DATA, { where: { name: '{{name}}' } });
  expect(obj.where.name).toBe(MOCK_DATA.name);

  const obj1 = replace(MOCK_DATA, JSON.stringify({ name: "{{name}}" }));
  expect(obj1.name).toBe(MOCK_DATA.name)
})