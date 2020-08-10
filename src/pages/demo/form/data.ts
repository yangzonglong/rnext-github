/*
 * @Author: yangzonglong
 * @Date: 2020-07-30 10:34:28
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-08-04 15:17:12
 * @Auditor: 
 */ 
import { FormxControlTypes as FCT } from '@library';

const disabled = true;
const required = true;

const projectTypeOptions = {
  url: '/bk/api/project/ProjectType/find',
  fieldNames: { label: 'projectTypeDesc', value: 'projectTypeCode' },
  extra: ['projectTypeDesc']
}

const parentProjectOptions = {
  model: {
    title: '选择父级项目',
    url: '/bk/api/project/Project/find',
    columns: [
      { dataIndex: 'projectName' },
      { dataIndex: 'projectNumber' },
      { dataIndex: 'createdAt' }
    ],
    fieldNames: { value: 'projectName', label: 'projectName' },
    searchFields: ['projectName','projectNumber']
  }
}

export const baseFormItems = [
  { name: 'projectName', required },
  { name: 'parentProjectId', type: FCT.MODAL_TABLE, options: parentProjectOptions },
  { name: 'projectTypeCode', required, type: FCT.SELECT, options: projectTypeOptions },
  { name: 'projectNumber', disabled },
  { name: 'startTime', required, type: FCT.RANGE_PICKER },
  { name: 'leaderId' },
  { name: 'budget', required, type: FCT.MONEY },
  { name: 'contractAmount', type: FCT.MONEY },
  { name: 'restBudget', type: FCT.MONEY },
  { name: 'currencyCode', required }
]

export const tabs = [
  { id: '0', label: '基础演示' },
  { id: '1', label: '联动&附件' },
]

// 联动示例所需

const projectOptions = {
  url: '/bk/api/project/Project/find',
  fieldNames: { label: 'projectName', value: 'projectName' },
  extra: ['projectNumber','id:ProjectId']
}

const taskOptions = {
  url: '/bk/api/project/Task/find',
  fieldNames: { label: 'taskName', value: 'taskName' },
  query: { where: { ProjectId: "{{ProjectId}}" } },
  extra: ['taskNumber', 'id:taskId']
}

export const linkageFormItems = [
  { name: 'projectName', type: FCT.SELECT, options: projectOptions },
  { name: 'projectNumber', disabled: true },
  { name: 'task', type: FCT.SELECT, options: taskOptions, bindField: 'projectName' },
  { name: 'file', type: FCT.FILE_UPLOAD },
  { name: 'switch', type: FCT.SWITCH },
  { name: 'switchBindInput', ghost: '!({{switch}}&&{{projectName}})' },
  { name: 'required', disabled: '{{switch}}', required: '{{switch}}' }
]
