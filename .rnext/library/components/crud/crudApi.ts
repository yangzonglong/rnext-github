/*
 * @Author: yangzonglong
 * @Date: 2020-06-23 13:31:31
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-06-23 14:31:07
 * @Auditor: 
 */
import server from './../../utils/server/server';
import { message } from 'antd';

export async function snedAction(url: string, data: any) {
  try {
    const result = await server(url, data);
    message.success('操作成功');
    return result
  } catch (error) {
    message.error('操作失败');
    return
  }
}