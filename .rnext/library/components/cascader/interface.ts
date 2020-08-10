/*
 * @Author: yangzonglong
 * @Date: 2020-07-14 15:23:14
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-15 11:18:57
 * @Auditor: 
 */

export interface CascaderModel {
  url: string;
  fieldNames: {
    value: string;
    label: string
  },
  query?: object;
  children?: CascaderModel
}

export interface CascaderProps {
  model: CascaderModel;
  id?: string;
  onChange?(value: (string | number)[], id: string): void
}