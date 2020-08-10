/*
 * @Author: yangzonglong
 * @Date: 2020-06-30 13:21:05
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-31 13:15:59
 * @Auditor: 
 */
import { ISelected, FormxChange, SelectChange } from './interface';
import { setExtra } from '@library/components/formx/util';

interface HandleChangeOptions {
  value: string | string[],
  id: undefined | string,
  dataSource: any[],
  fieldNames: ISelected,
  extra?: string[],
  onChange?: FormxChange | SelectChange
}

function selectItemsMapInValue(dataSource: any[], fieldNames: ISelected,) {
  return dataSource.reduce((next, cur) => {
    next[cur[fieldNames.value]] = cur;
    return next
  }, {});
}

function handleMultipleChange({ dataSource, value, fieldNames, onChange, id }: HandleChangeOptions) {

  const items = dataSource.filter(item => value.includes(item[fieldNames.value]));
  const dataSourceMapInValue = selectItemsMapInValue(dataSource, fieldNames);

  const selects = items.map((item: any) => {
    const curData = dataSourceMapInValue[item[fieldNames.value]];
    return {
      label: curData[fieldNames.label],
      value: curData[fieldNames.value]
    }
  })

  if (!id) return (onChange as SelectChange)?.(selects, items); // form 自动管理
  return (onChange as FormxChange)(value, id)
}

function handleRadioChange({ dataSource, fieldNames, value, extra, id, onChange }: HandleChangeOptions) {

  const item = dataSource.find(item => value === item[fieldNames.value]),
    handleValue = item![fieldNames.value], extraValue = {};
  
  if (extra && extra.length) {
    extra.forEach(extraItem => {
      if(extraItem.indexOf(':') > 0) {
        const arr = extraItem.split(':');
        extraValue[arr[1]] = item![arr[0]]
      }else {
        extraValue[extraItem] = item![extraItem]
      }
    })
  }

  if (!id) (onChange as SelectChange)?.({ label: item![fieldNames.label], value: handleValue }, item!);
  setExtra(extraValue);
  (onChange as FormxChange)?.(handleValue, id!)
}

export function handleChange(options: HandleChangeOptions) {
  if (Array.isArray(options.value)) return handleMultipleChange(options)
  handleRadioChange(options)
}

export function handleValue(value: undefined | string | string[], mode?: string) {
  if (!value) return mode ? [] : '';
  return value
}