/*
 * @Author: yangzonglong
 * @Date: 2020-07-14 16:07:15
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-15 13:35:19
 * @Auditor: 
 */
import { CascaderModel } from './interface';
import { CascaderOptionType } from 'antd/lib/cascader';

export function handleOptions(data: object[], curModel: CascaderModel) {
  return data.map(item => ({
    label: item[curModel.fieldNames.label],
    value: item[curModel.fieldNames.value],
    isLeaf: !curModel.children,
    _data: item,
    _model: curModel
  }))
}

export function handleValue(value: (string | number)[], options: CascaderOptionType[]){
  const modelIndex = value.length - 1;
  let curModel = options[0], i = 0;
  while(i < modelIndex) {
    if(curModel.children) curModel = curModel.children;
    i++;
  }
  console.log(curModel)
}