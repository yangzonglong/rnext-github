/*
 * @Author: yangzonglong
 * @Date: 2020-07-01 14:57:18
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-13 16:43:14
 * @Auditor: 
 */
const required = true;

export const columns = [
  { dataIndex: 'id' },
  { dataIndex: 'type' },
  { dataIndex: 'action', width: 80 }
]

const typeData = [
  { value: 'modalTableInModel', label: 'modalTableInModel' },
  { value: 'cascader', label: 'cascader' }
]

export const formItems = [
  { name: 'id', required: true },
  {
    name: 'type',
    type: 'select',
    required: true,
    options: {
      dataSource: typeData,
      fieldNames: {
        value: 'value',
        label: 'label'
      }
    }
  }
]

export const controlFormItems = {
  modalTableInModel: [
    {
      name: 'columns',
      type: 'select',
      options: {
        dataSource: [] as any[],
        mode: 'multiple',
        fieldNames: {
          value: 'fieldName',
          label: 'fieldName'
        }
      }
    },
    { name: 'value', required },
    { name: 'label', required },
    { name: 'cn', required },
    { name: 'en' }
  ],
  cascader: [
    { name: 'mainModelValue', required },
    { name: 'mainModelLabel', required },
    { name: 'childModel', required },
    { name: 'childModelValue', required },
    { name: 'childModelLabel', required },
    { name: 'relevanceKey', required }
  ]
}