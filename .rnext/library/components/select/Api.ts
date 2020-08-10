/*
 * @Author: yangzonglong
 * @Date: 2020-06-15 14:07:19
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-06-23 16:30:48
 * @Auditor: 
 */
import server from './../../utils/server/server';

const cache = {};

export async function getData(url: string, query: object, cacheKey?: string, rtnDataAfter?: Function) {
  try {
    if(cacheKey && cache[cacheKey]) return cache[cacheKey];
    const result = await server(url, query);
    const rows = rtnDataAfter ? rtnDataAfter(result) : (result.rows || result);
    if(cacheKey) cache[cacheKey] = rows;
    return rows
  } catch (error) {
    return []
  }
}