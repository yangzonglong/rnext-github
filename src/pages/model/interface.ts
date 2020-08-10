/*
 * @Author: yangzonglong
 * @Date: 2020-06-28 13:42:45
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-15 17:20:49
 * @Auditor: 
 */
import { Type } from '@library/components/formx/interface';

export interface AttributeItemProps {
  id?: string,
  fieldName?: string,
  type?: string,
  controlType?: Type,
  required?: boolean,
  tableShowFlag?: boolean,
  formShowFlag?: boolean,
  options?: string | any,
  rules?: string | object,
  locales?: string | object,

  cn?: string,
  en?: string
}

export type TabItemProps = {
  id?: string,
  cn?: string,
  en?: string,
  locales?: {
    cn?: string,
    en?: string
  },
  childs?: string[]
}

export type RelationItemProps = {
  model?: string,
  type?: string
}

export type ApiModelItemProps = {
  type?: string;
  id?: string;
  columns?: string[];
  fieldNames?: {
    value?: string;
    label?: string
  };
  label?: string;
  value?: string;
  locales?: {
    cn?: string;
    en?: string
  },
  cn?: string;
  en?: string
}

export interface ModelProps {
  attributes?: AttributeItemProps[],
  tabs?: TabItemProps[],
  relations?: RelationItemProps[],
  apiModels?: ApiModelItemProps[],
  unique?: Array<string[]>
}