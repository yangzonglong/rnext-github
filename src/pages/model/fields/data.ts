/*
 * @Author: yangzonglong
 * @Date: 2020-06-24 16:58:11
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-18 13:42:55
 * @Auditor: 
 */

const fieldNames = { label: 'name', value: 'value' };
const required = true;

export const tabsData = [
  { id: 'base', label: '基本' },
  { id: 'table', label: '表格' },
  { id: 'form', label: '表单' }
]

const typeDataSource = [
  { value: 'input', name: '输入框(input)', id: 'input' },
  { value: 'select', name: '下拉框(select)', id: 'select' },
  { value: 'cascader', name: '级联选择(cascader)', id: 'cascader' },
  { value: 'date', name: '日期选择(date)', id: 'date' },
  { value: 'number', name: '数字输入框(inputNumber)', id: 'number' },
  { value: 'money', name: '金额(money)', id: 'money' },
  { value: 'modalTableInModel', name: '模态框选择(modalTableInModel)', id: 'modalTableInModel' },
  { value: 'switch', name: '切换(switch)', id: 'switch' },
  { value: 'textarea', name: '多行文本(textarea)', id: 'textarea' },
  { value: 'cascader', name: '级联选择(cascader)', id: 'cascader' },
  { value: 'fileUpload', name: '上传控件(fileUpload)', id: 'fileUpload' }
]

export const tabsFormItems = {
  base: [
    { name: 'fieldName', required: true },
    { name: 'type' },
    { 
      name: 'controlType', 
      type: 'select', 
      options: { 
        dataSource: typeDataSource, 
        fieldNames 
      } 
    },
    { 
      name: 'bindField', 
      type: 'select', 
      options: { 
        dataSource: [] as any,
        fieldNames
      } 
    },
    { 
      name: 'typeField',
      type: 'select', 
      options: { 
        dataSource: [] as any,
        fieldNames
      } 
    },
    { name: 'order', type: 'number' },
    { name: 'cn' },
    { name: 'en' },
    { name: 'tableShowFlag', type: 'switch' },
    { name: 'formShowFlag', type: 'switch' },
  ],
  table: [
    { name: 'filter', type: 'switch' },
    { name: 'sort', type: 'switch' },
    { name: 'ellipsis', type: 'switch' },
    { name: 'tooltip', type: 'switch' },
    { name: 'width', type: 'number' }
  ],
  form: [
    { name: 'disabled', type: 'switch' },
    { name: 'required', type: 'switch' }
  ]
}

const selectionTypes = [
  { value: 'radio', label: '单选(默认)' },
  { value: 'checkbox', label: '多选' }
]

export const typeExtraMap = {
  select: [
    { 
      name: 'url', 
      options: { 
        placeholder: 'url/dataSource 必须指定一个' 
      } 
    },
    { 
      name: 'value', 
      required: true,
      options: {
        placeholder: 'select value field'
      }
    },
    { 
      name: 'label', 
      required: true,
      options: {
        placeholder: 'select label field'
      }
    },
    { 
      name: 'extra',
      options: {
        placeholder: 'select 默认只会输出value，多字段输出格式 ["field1","field2"]'
      }
    },
    { 
      name: 'dataSource', 
      type: 'textArea',
      options: {
        placeholder: '自定义数据源，格式 [{}, {}]'
      }
    },
    { 
      name: 'query', 
      type: 'textArea',
      options: {
        placeholder: '查询参数，当联动时支持获取其它select extra暴露的字段，格式：{ where: { fidle: "$fidle$" } }'
      } 
    }
  ],
  modalTableInModel: [
    { name: 'moduleName', required: true },
    { name: 'modelName', required: true },
    {
      name: 'rowSelectionType',
      type: 'select',
      options: {
        dataSource: selectionTypes,
        fieldNames: {
          value: 'value',
          label: 'label'
        }
      }
    }
  ],
  consoleSelect: [
    { name: 'code' }
  ],
  cascader: [
    { name: 'url', required },
    { name: 'value', required },
    { name: 'label', required },
    { name: 'url1', required },
    { name: 'value1', required },
    { name: 'label1', required },
    { name: 'query1'}
  ],
  fileUpload: [
    { name: 'only', type: 'switch' },
    { name: 'maxSize', type: 'number' }
  ]
}