/*
 * @Author: yangzonglong
 * @Date: 2020-05-18 09:48:18
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-17 13:44:59
 * @Auditor: 
 */
import axios, { AxiosRequestConfig } from 'axios';
import { message } from 'antd';

const { error } = message;
export const TIMEOUT = 1000 * 60 * 2; // 默认2分钟超时
export const METHOD = 'POST';

export default async function (url: string, data: Record<string, any>, options?: AxiosRequestConfig) {
  try {
    const result = await axios(mergeOptions(url, data, options));
    if (result.status === 200) { // http
      const data = result.data;
      if (data.status === 200) return data.result;

      const message = data.message || {};
      error(data.message?.message);
      
      if(message.code === -11 && process.env.REACT_APP_ENV !== 'dev') {
        window.top.location.href = '/'
    }

      // eslint-disable-next-line
      throw { message: message.message, code: message.code }
    }
  } catch (error) {
    throw error
  }
}

export function mergeOptions(url: string, data: Record<string, any>, options?: AxiosRequestConfig) {
  const _options = options || {};
  _options.method = _options.method || METHOD;
  _options[_options.method === 'GET' ? 'params' : 'data'] = data;
  _options.url = url;
  _options.timeout = TIMEOUT;
  return _options;
}