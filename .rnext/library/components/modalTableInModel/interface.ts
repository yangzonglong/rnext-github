/*
 * @Author: yangzonglong
 * @Date: 2020-06-08 11:23:29
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-02 13:29:34
 * @Auditor: 
 */
import { ColumnProps } from './../table/interface';

export interface FieldNames {
  value: string;
  label: string;
}

export interface ModelProps {
  title: string;
  columns: ColumnProps<any>[];
  url: string;
  fieldNames: FieldNames,
  searchFields?: string[];
  query?: object
}

export interface ModalTableInModelProps {
  moduleName: string;
  modelName: string;
  visible: boolean;
  onCancel(): void;
  onOk(rows: object[]): void;
  syncModel?(model: ModelProps): void; // 向上同步model
  rowSelectionType?: 'radio' | 'checkbox';
  model?: ModelProps,
  fieldNames?: FieldNames
}

export interface ApiModelProps {
  id: string;
  type: string;
  columns: string[];
  locales: {
    cn?: string,
    en?: string
  },
  fieldNames: {
    value: string,
    label: string
  }
}