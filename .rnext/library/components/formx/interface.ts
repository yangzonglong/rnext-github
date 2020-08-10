/*
 * @Author: yangzonglong
 * @Date: 2020-06-17 15:02:01
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-08-04 10:29:11
 * @Auditor: 
 */
import { FormProps as AntdFormProps } from 'antd/lib/form/Form';
import { Rule, FormInstance } from 'rc-field-form/lib/interface';
import { SelectProps } from './../select/interface';

export type Type = 'input' | 'inputNumber' | 'datePicker' | 'consoleSelect' | 'switch' |
  'textArea' | 'MoneyInputNumber' | 'FileUploadInput' | 'ModalTableInModelInput' | string

export interface FormItemProps {
  name: string,
  label?: string,
  type?: Type,
  required?: boolean | string,
  disabled?: boolean | string,
  ghost?: boolean | string,
  options?: SelectProps | object,
  rules?: Rule[],
  bindField?: string
}

export interface FormxProps extends AntdFormProps {
  formItems: FormItemProps[],
  groupNumber?: number,
  initialValues?: object,
  onValuesChange?(changedValues: any, allValues: any): void
}

export interface FormxRefProps extends FormInstance { }