/*
 * @Author: yangzonglong
 * @Date: 2020-07-15 09:40:52
 * @version: v1.0.0
 * @Descripttion: 替换对象中指定格式的文本
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-08-04 14:24:56
 * @Auditor: 
 */
import { stringify, parse } from './../json/json';

export function replace(data: object, str: string, callback?: Function) {
  return str.replace(/\{{(.*?)\}}/g, (str: string) => {
    const k = str.match(/(?<=\{{)(.*?)(?=\}})/)?.[0];
    callback?.(k, data[k!]);
    return data[k!]
  })
}

export default function (data: object, target?: object | string) {
  if (!target) return {};

  let queryJSonStr = typeof target === 'string' ? target : stringify(target);
  queryJSonStr = replace(data, queryJSonStr)

  return parse(queryJSonStr) || {}
}
