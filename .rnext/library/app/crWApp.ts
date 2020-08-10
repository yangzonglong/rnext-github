/*
 * @Author: yangzonglong
 * @Date: 2020-07-06 14:11:49
 * @version: v1.0.0
 * @Descripttion: 挂载 window app
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-06 14:14:30
 * @Auditor: 
 */ 
import i18n, { i18nt } from './i18n';
import history from './history';

function t(k: string) {
  const text = i18nt(k);
  if (text === k) return i18n.t(k);
  return text
}

export default {
  history,
  t: t,
  MOMENT_FORMAT_TIME: 'YYYY-MM-DD HH:mm',
  MOMENT_FORMAT_DATE: 'YYYY-MM-DD'
}