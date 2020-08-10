/*
 * @Author: yangzonglong
 * @Date: 2020-05-27 10:25:06
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-06-17 13:02:24
 * @Auditor: 
 */
import server from './../../utils/server/server';

export async function getList(url: string, page: Number, pageSize: number, sorter: string[], query: object) {
  try {
    const data: any = { pages: { pageSize, page }, ...query };
    if(sorter.length) data.order = [sorter];
    const { count, rows } = await server(url, data);
    return { count, rows }
  } catch (error) {
    return { rows: [], count: 0 }
  }
}