/*
 * @Author: yangzonglong
 * @Date: 2020-06-23 10:54:11
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-13 16:04:26
 * @Auditor: 
 */
import { ColumnProps } from './../table/interface';
import { FormItemProps } from './../formx/interface';
import { ColProps } from 'antd/lib/grid/col';
import { } from 'antd/lib/form/interface';

export interface EditProps {
  visible: boolean,
  formItems: FormItemProps[],
  onCancel(): void,
  initialValues: any,
  labelCol?: ColProps,
  wrapperCol?: ColProps,
  layout?: 'horizontal' | 'inline' | 'vertical',
  onOk(values: any): void,
  groupNumber?: number,
  onRemove?(values: any): void,
  onValuesChange?(changedValues: any, allValues: any): void
}

export interface CRUDProps {
  baseUrl?: string,
  columns: ColumnProps<object>[],
  formItems: FormItemProps[],
  urls?: {
    findUrl?: string,
    removeUrl?: string,
    updateUrl?: string
    addUrl?: string
  },
  onValuesChange?(changedValues: any, allValues: any): void,
  saveDataBefore?(data: any): any | string,
  saveDataAfter?(data: any, result: any): void,
  getDataAfter?(data: any): any,
  showCreateModalBefore?(): void
}