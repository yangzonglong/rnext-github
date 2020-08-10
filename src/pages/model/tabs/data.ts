/*
 * @Author: yangzonglong
 * @Date: 2020-06-30 11:10:47
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-08 17:22:32
 * @Auditor: 
 */ 

export const columns = [
  { dataIndex: 'id' },
  { dataIndex: 'locales', render: (text: undefined | object) => text ? JSON.stringify(text) : '' },
  { dataIndex: 'childs', width: 500, ellipsis: true, tooltip: true, render: (text: string[]) => text.join(',') },
  { dataIndex: 'action', width: 80 }
]

export const formItems = [
  { name: 'id', required: true },
  { name: 'cn', required: true },
  { name: 'en' },
  { 
    name: 'childs', 
    type: 'select', 
    required: true, 
    options: {
      mode: 'multiple',
      dataSource: [] as any[],
      fieldNames: {
        value: 'fieldName',
        label: 'fieldName'
      }
    } 
  }
]