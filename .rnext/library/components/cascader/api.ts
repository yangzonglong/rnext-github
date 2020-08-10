/*
 * @Author: yangzonglong
 * @Date: 2020-07-14 16:03:43
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-15 09:32:22
 * @Auditor: 
 */
import server from './../../utils/server/server';

export async function getDataApi(url: string, query?: object) {
  try {
    const result = await server(url, query || {});
    return result.rows ? result.rows : result
  } catch (error) {
    return []
  }
}