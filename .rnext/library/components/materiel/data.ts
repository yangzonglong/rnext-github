/*
 * @Author: yangzonglong
 * @Date: 2020-06-15 14:31:30
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-06-15 14:42:45
 * @Auditor: 
 */ 

export const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export const columns = [
  { dataIndex: 'materialCode', width: 150, tooltip: true, ellipsis: true },
  { dataIndex: 'materialDesc', width: 150, tooltip: true, ellipsis: true },
  { dataIndex: 'materialTypeCode' },
  { dataIndex: 'materialTypeName' },
  { dataIndex: 'materialGroupCode' },
  { dataIndex: 'standard', width: 100, ellipsis: true },
  { dataIndex: 'texture' }
]

export const searchData = [
  { 
    label: '类型',
    url: '/bk/api/material/MaterialType/find', 
    fieldNames: { label: 'materialTypeName', value: 'materialTypeCode' } 
  },
  { 
    label: '属性',
    url: '/bk/api/material/MaterialAttribute/find', 
    fieldNames: { label: 'materialAttributeName', value: 'materialAttributeCode' } 
  },
  { 
    label: '物料组',
    url: '/bk/api/material/MaterialGroup/find', 
    fieldNames: { label: 'materialGroupName', value: 'materialGroupCode' } 
  }
]