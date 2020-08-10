import moment from 'moment';
import { FormItemProps } from './interface';
import { SelectProps } from './../select/interface';
import replaceToObj, { replace } from './../../utils/replace/replace';
import { FormxControlTypes as FCT } from './data';
import { parse, stringify } from './../../utils/json/json';

const EXTRA_SESSION_KEY = 'formxExtra';
const DEFAULT_GROUP_NUM = 4;
const SPAN = 24;

const cache = {};
const requiredTrueObj = [{ required: true }];
const requiredFalseObj = [{ required: false }];

function getCacheKey(str: string, data: object) {
  let cacheKey: string[] = [];
  replace(data, str, (k: string, v: any) => cacheKey.push(`${k}=${v}`));
  return cacheKey.join(',')
}

function strToEvalJS(str: string | boolean | undefined, data: object) {
  if (typeof str === 'boolean' || !str) return str;
  // eslint-disable-next-line
  return eval(replace(data, str))
}

export function getDisabled(formItem: FormItemProps, data: object) {
  return strToEvalJS(formItem.disabled, data)
}

export function getRules(formItem: FormItemProps, data: object) {
  if (formItem.rules) return formItem.rules;
  if (typeof formItem.required === 'boolean') return formItem.required ? requiredTrueObj : requiredFalseObj;

  if (typeof formItem.required === 'string') {
    const cacheKey = getCacheKey(formItem.required, data);
    const prevRulesCacheKey = (formItem as any)._prevRulesCacheKey;

    if (cacheKey !== prevRulesCacheKey) {
      (formItem as any)._prevRulesCacheKey = cacheKey;
      cache[cacheKey] = [{ required: strToEvalJS(formItem.required, data) }];
    }

    return cache[cacheKey]
  }
}

// formItem 分组
export function handleFormItemsGroup(formItems: FormItemProps[], data: object, groupNum?: number) {
  let groups: Array<FormItemProps[]> = [], index = 0;

  formItems.forEach((item) => {
    const ghost = strToEvalJS(item.ghost, data);
    if (!ghost) {
      const groupIndex = Math.floor(index / (groupNum || DEFAULT_GROUP_NUM));
      if (!groups[groupIndex]) groups[groupIndex] = [];

      groups[groupIndex].push(item);
      index++;
    }
  })

  return groups;
}

export function handleRowColStyle(groupNumber?: number) {
  if (groupNumber === 1) return { span: SPAN };

  const num = SPAN / (groupNumber || DEFAULT_GROUP_NUM);
  return { span: num }
}


export function handleInitialValues(initialValues: object, formItems: FormItemProps[]) {
  const newInitialValues = {};

  for (let k in initialValues) {

    const value = initialValues[k];
    const formItem = formItems.find(item => item.name === k);

    if (formItem?.type === FCT.DATE && value) {
      newInitialValues[k] = moment(value);
      break
    }

    if (formItem?.type === FCT.RANGE_PICKER && value) {
      newInitialValues[k] = value.map((item: string) => moment(item));
      break
    }

    newInitialValues[k] = value
  }

  return newInitialValues
}

function getSelectExtra(formItem: FormItemProps) {
  const options = formItem.options as SelectProps;
  if (options.extra && options.extra.length) return parse(sessionStorage[EXTRA_SESSION_KEY]);
  return {};
}

export function setExtra(extra: any) {
  sessionStorage[EXTRA_SESSION_KEY] = stringify(extra)
}

export function getExtraData(formItems: FormItemProps[], changedValues: object) {
  const currentName = Object.keys(changedValues)[0];
  const currentFormItem = formItems.find(({ name }) => name === currentName);

  if (currentFormItem?.options) {
    const type = currentFormItem.type as string;
    if (type === FCT.SELECT || type === FCT.CONSOLE_SELECT) return getSelectExtra(currentFormItem);
    if (type === FCT.MODAL_TABLE) return parse(sessionStorage[EXTRA_SESSION_KEY]);
  }

  return {}
}

// 处理 validateFields 返回的 value
export function handleValues(formItems: FormItemProps[], values: object) {
  for (let name in values) {

    const currentFormItem = formItems.find(item => item.name === name);
    const value = values[name];

    if (currentFormItem && value) {
      const type = currentFormItem.type as string;
      if (type === FCT.DATE) values[name] = moment(value).format(window.$app.MOMENT_FORMAT_TIME);
      if (type === FCT.RANGE_PICKER) values[name] = value.map((item: moment.MomentInput) => moment(item).format(window.$app.MOMENT_FORMAT_TIME));
    }
  }

  return values
}

// 控件 extra配置的额外参数会直接以kv的形式挂载到formx formItemExtraData ref对象
// modalTableInModel由于支持多选kv比较特殊，其中k是以 '_' + 字段name，v则是数组
function getControlExtraKey(formItem: FormItemProps, curFormItem: FormItemProps) {
  if (curFormItem.type === FCT.MODAL_TABLE) return '_' + formItem.bindField;
  return formItem.bindField || formItem.name
}

// 找出关联的formItems
function filterBindFormItems(formItems: FormItemProps[], name: string, extras: string[]) {
  const curFormItem = formItems.find(item => item.name === name);

  const filterFormItemsInCurBind = formItems.filter(item => {
    return extras.includes(getControlExtraKey(item, curFormItem!)) || (item.name !== name && extras.includes(item.name))
  })

  return filterFormItemsInCurBind
}

// 处理input联动
function handleBindInputRelation(curExtraData: object, formItem: FormItemProps) {
  return typeof curExtraData === 'object' ? curExtraData[formItem.bindField || formItem.name] : curExtraData
}

// 处理select联动
function handleBindSelectRelation(allValues: object, formItem: FormItemProps) {
  const selectOptions = formItem.options as SelectProps;

  // 需要把原始的query记录下来，否则第二次无法替换字段
  if (!(selectOptions as any)._query) (selectOptions as any)._query = selectOptions.query;

  return replaceToObj(allValues, (selectOptions as any)._query);
}

// 处理联动关系
export function handleBindRelations(formItems: FormItemProps[], changedValues: object, allValues: object) {

  const extras = Object.keys(changedValues);
  const name = Object.keys(changedValues)[0];
  const formItemsInBindField = filterBindFormItems(formItems, name, extras); // 找出关联的formItem
  const curFormItem = formItems.find(item => item.name === name);

  if (formItemsInBindField.length) {
    const fieldValues = {};

    formItemsInBindField.forEach(item => {
      let curExtraData = allValues[getControlExtraKey(item, curFormItem!)];

      if (!item.type || item.type === FCT.INPUT) {
        fieldValues[item.name] = handleBindInputRelation(curExtraData, item)
      }

      if (item.type === FCT.SELECT && item.options && (item.options as SelectProps).query) {
        const query = handleBindSelectRelation(allValues, item);
        const index = formItems.indexOf(item);

        (formItems as any)[index] = { ...formItems[index], options: { ...formItems[index].options, query } };
        fieldValues[item.name] = undefined;
      }
    })

    return fieldValues
  }

  return {}
}