/*
 * @Author: yangzonglong
 * @Date: 2020-06-30 15:32:37
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-06-30 16:59:31
 * @Auditor: 
 */

export const columns = [
  { dataIndex: 'model' },
  { dataIndex: 'type' },
  { dataIndex: 'action', width: 60 }
]

const dataSource = [
  { label: 'OneToOne', value: 'OneToOne' },
  { label: 'OneToMany', value: 'OneToMany' },
  { label: 'ManyToOne', value: 'ManyToOne' },
  { label: 'ManyToMany', value: 'ManyToMany' }
]

export const formItems = [
  { 
    name: 'model', 
    required: true,
    type: 'select',
    options: {
      dataSource: [] as any[],
      fieldNames: {
        value: 'model',
        label: 'model'
      }
    }
  },
  {
    name: 'type',
    required: true,
    type: 'select',
    options: {
      dataSource,
      fieldNames: {
        value: 'value',
        label: 'label'
      }
    }
  }
]