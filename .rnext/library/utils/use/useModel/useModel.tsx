import { useState, useEffect } from 'react';
import { FormItemProps } from '@library/components/formx/interface';
import { Rule } from 'rc-field-form/lib/interface';
import { ColumnProps } from '../../../components/table/interface';
import { useRequest } from 'ahooks';
import server from '../../server/server';
import history from '../../../app/history';
import i18n from '../../../app/i18n';
import { PACKAGE_NAME } from '../../../app/automatic/package';

type NewColumnProps = ColumnProps<any>;

type TabItem = {
  id: string,
  label: string,
  childs?: string[],
  locales?: {
    cn?: string,
    en?: string
  }
}

export type TabFormItems = {
  [prop: string]: {
    formItems: FormItemProps[];
    name: string
  }
}

type FormModel = {
  formItems: FormItemProps[],
  columns: NewColumnProps[],
  placeholder: string,
  searchFields: string[],
  tabs: TabItem[],
  tabsFormItems: TabFormItems
}

interface OptionsProps {
  modelUrl?: string,
  defaultColumns?: NewColumnProps[]
}

export interface ModelItemProps {
  order: number;
  filter: boolean,
  sort: boolean,
  type: string,
  controlType: string,
  locales: { en: string, cn: string },
  dataIndex?: string,
  ghost?: boolean,
  tableShowFlag?: boolean,
  formShowFlag?: boolean,
  options?: object,
  disabled?: boolean,
  rules?: Rule[],
  bindField?: string,
  required?: boolean,
  width?: number,
  ellipsis?: boolean,
  tooltip?: boolean,
  _id?: string
}

const defaultData = {
  formItems: [],
  columns: [],
  placeholder: '',
  searchFields: [],
  tabs: [],
  tabsFormItems: {}
}

function getModelUrl() {
  const pathname = history.location.pathname.split('/')[1];
  const handelPathName = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  return `/bk/ipfs/${PACKAGE_NAME}/${handelPathName}/getModel`;
}

async function getModel(url?: string) {
  try {
    const result = await server(url || getModelUrl(), {})
    return result;
  } catch (error) {
    return {}
  }
}

function modelObjToArr(models: { [propName: string]: ModelItemProps }) {
  const arr = [];
  for (let k in models) {
    arr.push({ ...models[k], _id: k })
  }
  return arr
}

function modelsToFormItems(models: ModelItemProps[]) {
  const language = i18n.language === 'zh-CN' ? 'cn' : i18n.language;
  const filter = models.filter(item => item.formShowFlag);
  return filter.map(item => ({
    name: item._id as string,
    label: item.locales?.[language] || ' ',
    options: item.options || {},
    rules: item.rules,
    disabled: item.disabled,
    type: item.controlType || 'input' as any,
    bindField: item.bindField,
    required: item.required
  }))
}

function modelsToColumns(models: ModelItemProps[]) {
  const language = i18n.language === 'zh-CN' ? 'cn' : i18n.language;
  const filter = models.filter(item => item.tableShowFlag);
  return filter.map(item => ({
    dataIndex: item._id,
    sorter: item.sort,
    title: item.locales[language],
    format: item.controlType,
    width: item.width,
    ellipsis: item.ellipsis,
    tooltip: item.tooltip
  }));
}

function getSearchFieldsAndPlaceholder(models: ModelItemProps[]) {
  const language = i18n.language === 'zh-CN' ? 'cn' : i18n.language;
  const searchFields: string[] = [], placeholders: string[] = [];

  models.forEach(item => {
    if (item.filter) {
      searchFields.push(item._id as string);
      placeholders.push(item.locales[language])
    }
  })

  return { 
    searchFields, 
    placeholder: window.$app.t('pleaseEnter') + placeholders.join('/') 
  }
}

function mergeColumns(modelColumns: NewColumnProps[], columns: NewColumnProps[]) {
  const modelColumnsMap = modelColumns.reduce((next: object, column: NewColumnProps) => {
    return (next[column.dataIndex as string] = column) && next;
  }, {});

  const columnsMap = columns.reduce((next: object, column: NewColumnProps) => {
    return (next[column.dataIndex as string] = column) && next;
  }, {});

  const mergeColumns = { ...modelColumnsMap, ...columnsMap };
  return Object.values(mergeColumns)
}

function handleTabs(tabs: TabItem[]){
  const language = i18n.language === 'zh-CN' ? 'cn' : i18n.language;
  return tabs.map(item => ({ id: item.id, label: item.locales?.[language] }))
}

function handleTabsFormItems(formItems: FormItemProps[], tabs: TabItem[]){
  const language = i18n.language === 'zh-CN' ? 'cn' : i18n.language;
  return tabs.reduce((next: TabFormItems, cur: TabItem) => {
    const childs = formItems.filter(formItem => cur.childs?.includes(formItem.name as any));
    next[cur.id] = {
      formItems: childs,
      name: cur.locales?.[language] || ''
    }
    return next
  }, {});
}

export default (options: OptionsProps, depends: any[] = []) => {
  const [data, setData] = useState<FormModel>(defaultData);

  const { run } = useRequest(getModel, {
    manual: true,
    cacheKey: options.modelUrl,
    onSuccess({ attributes, tabs }) {
      let models = modelObjToArr(attributes);

      models = models.sort((a, b) => {
        if (a.order > b.order) return 1;
        return -1
      });

      let formItems = modelsToFormItems(models);
      let columns = modelsToColumns(models);

      setData({
        formItems,
        columns: mergeColumns(columns, options.defaultColumns || []) as NewColumnProps[],
        tabs: handleTabs(tabs || []),
        tabsFormItems: handleTabsFormItems(formItems, tabs || []),
        ...getSearchFieldsAndPlaceholder(models)
      })
    }
  });

  useEffect(() => {
    run(options.modelUrl)
    // eslint-disable-next-line
  }, [options.modelUrl, run, ...depends]);

  return data
}