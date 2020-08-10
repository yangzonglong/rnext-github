/*
 * @Author: yangzonglong
 * @Date: 2020-07-10 10:01:38
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-10 14:05:50
 * @Auditor: 
 */ 
import { PACKAGE_NAME } from '@library/app/automatic/package';

const required = true;
const workFlowHeadUrl = '/bk/api/workflow/WorkFlowHead/find';
const birtModelUrl = '/bk/api/printing/BirtModel/find';

export const codingRuleFormItems = [
  { name: 'prefixalChar', required },
  { name: 'stepSize', required, type: 'number' },
  { name: 'placesNum', required, type: 'number' },
  { name: 'startNum', required }
]

export const auditFormItems = [
  { name: 'auditFlag', type: 'switch' }
]

export const workFlowFormItems = [
  { 
    name: 'workflowNumber',
    type: 'select',
    required,
    options: {
      url: workFlowHeadUrl,
      fieldNames: {
        value: 'workflowNumber',
        label: 'formName'
      },
      extra: ['formName'],
      query: { where: { moduleCode: PACKAGE_NAME } }
    }
  },
  { 
    name: 'businessCode',
    type: 'select',
    required,
    options: {
      url: birtModelUrl,
      fieldNames: {
        value: 'businessCode',
        label: 'businessName'
      },
      extra: ['birtModelFile'],
      query: { where: { birtModelCode: PACKAGE_NAME } }
    }
  },
  {
    name: 'reportTemplateFile',
    bindField: 'birtModelFile',
    disabled: true,
    type: 'input'
  }
]