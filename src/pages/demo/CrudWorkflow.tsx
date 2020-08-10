import React from 'react';
import { CRUD, units, FormxControlTypes as FCP } from '@library';

interface TypeProps {
  id?: string;
  codeDesc?: string;
  projectTypeCode?: string;
  projectTypeDesc?: string;
  projectCodingRuleId?: string,
  birtModelFile?: string,
  businessCode?: string,
  businessName?: string
}

const required = true;
const CODINGRULE_URL = '/bk/api/project/ProjectCodingRule/';
const flagRender = (flag: boolean) => flag ? '是' : '否';

const columns = [
  { dataIndex: 'projectTypeCode' },
  { dataIndex: 'projectTypeDesc' },
  { dataIndex: 'projectCategoryValue' },
  { dataIndex: 'auditFlag', render: flagRender },
  { dataIndex: 'enabledFlag', render: flagRender },
  { dataIndex: 'createdAt', format: 'time' }
]

const formItems = [
  { name: 'projectTypeCode', required },
  { name: 'projectTypeDesc', required },
  {
    name: 'projectCategoryCode', type: FCP.CONSOLE_SELECT, required,
    options: { code: 'PROJECT_CATEGORY', extra: ['codeDesc'] }
  },
  { name: 'prefixalChar', required },
  { name: 'stepSize', type: FCP.NUMBER, required },
  { name: 'startNum', type: FCP.NUMBER, required },
  { name: 'placesNum', type: FCP.NUMBER, required },
  { name: 'auditFlag', type: FCP.SWITCH },
  { name: 'enabledFlag', type: FCP.SWITCH },
  {
    name: 'workflowNumber', type: FCP.SELECT, required,
    options: {
      url: '/bk/api/workflow/WorkFlowHead/find',
      fieldNames: { value: 'workflowNumber', label: 'name' },
      query: { where: { moduleCode: 'project' } },
      extra: ['workflowName']
    }
  },
  {
    name: 'reportTemplateCode', type: FCP.SELECT, required,
    options: {
      url: '/bk/api/printing/BirtModel/find',
      fieldNames: { value: 'businessCode', label: 'businessName' },
      query: { where: { birtModelCode: 'project' } },
      extra: ['businessName', 'birtModelFile']
    }
  }
]

async function saveDataBefore(data: TypeProps) {
  const action = data.projectCodingRuleId ? 'update' : 'add';
  await units.server(`${CODINGRULE_URL}${action}`, {
    data: {
      ...data,
      serialRuleCode: data.projectTypeCode,
      serialRuleName: data.projectTypeDesc
    }
  })
  return {
    ...data,
    projectCategoryValue: data.codeDesc,
    reportTemplateFile: data.birtModelFile,
    reportTemplateName: data.businessName
  }
}

async function getDataAfter(data: TypeProps) {
  const { prefixalChar, stepSize, startNum, placesNum, id } = await units.server(`${CODINGRULE_URL}findOne`, {
    where: { serialRuleCode: data.projectTypeCode }
  })
  return {
    ...data,
    prefixalChar,
    stepSize,
    startNum,
    placesNum,
    projectCodingRuleId: id
  }
}

const urls = {
  addUrl: '/bk/api/project/ProjectType/add',
  updateUrl: '/bk/api/project/ProjectType/update',
  removeUrl: '/bk/api/project/ProjectType/delete',
  findUrl: '/bk/api/project/ProjectType/find'
}

export default () => {
  return (
    <CRUD saveDataBefore={saveDataBefore} getDataAfter={getDataAfter}
      formItems={formItems} columns={columns} urls={urls}/>
  )
}