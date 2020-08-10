/*
 * @Author: yangzonglong
 * @Date: 2020-07-15 10:09:38
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-08-05 11:30:38
 * @Auditor: 
 */
import { tabsFormItems } from './data';
import { AttributeItemProps } from '../interface';
import { FormItemProps } from '@library/components/formx/interface';

function handleSelectOptions(options: any) {
  options.fieldNames = {
    value: options.value,
    label: options.label
  }
  delete options.value;
  delete options.label
}

function handleCascaderOptions(options: any) {
  options.model = {
    url: options.url,
    fieldNames: {
      value: options.value,
      label: options.label
    },
    children: {
      url: options.url1,
      fieldNames: {
        value: options.value1,
        label: options.label1
      },
      query: options.query1
    }
  }
  delete options.url;
  delete options.value;
  delete options.label;
  delete options.value1;
  delete options.label1;
  delete options.url1;
}

export function handleField(values: AttributeItemProps, type: string) {
  if (values.options) {
    const options = values.options;
    if (options.extra) options.extra = JSON.parse(options.extra);
    if (options.dataSource) options.dataSource = JSON.parse(options.dataSource);
    if (type === 'select') {
      handleSelectOptions(options)
    } else if (type === 'cascader') {
      handleCascaderOptions(options)
    }
  }
  values.locales = { cn: values.cn, en: values.en };
  return values
}

export function handleCascaderOptionsModel(model: any = {}) {
  const fieldNames = model.fieldNames || {};
  const children = model.children || {};
  const childrenFieldNames = children.fieldNames || {};
  return {
    url: model.url,
    label: fieldNames.label,
    value: fieldNames.value,
    url1: children.url,
    value1: childrenFieldNames.value,
    label1: childrenFieldNames.label,
    query1: children.query
  }
}

export function handleTabFormData(tabId: string, values: any){
  const curTabFormItemsName = tabsFormItems[tabId].map((item: FormItemProps) => item.name);
  return Object.keys(values).reduce((next: object, cur: string) => {
    if(curTabFormItemsName.indexOf(cur) >= 0) {
      next[cur] = values[cur]
    }
    return next;
  }, {})
}