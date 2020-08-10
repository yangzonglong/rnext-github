/*
 * @Author: yangzonglong
 * @Date: 2020-07-17 13:57:35
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-17 14:05:53
 * @Auditor: 
 */

export function parse(str: any, defaultRtn?: any) {
  try {
    return JSON.parse(str);
  } catch (error) {
    return defaultRtn
  }
}

export function stringify(obj: any) {
  try {
    return JSON.stringify(obj)
  } catch (error) {
    return ""
  }
} 