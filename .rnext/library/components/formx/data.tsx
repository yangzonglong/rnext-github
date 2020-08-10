/*
 * @Author: yangzonglong
 * @Date: 2020-07-30 11:06:16
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-30 16:11:01
 * @Auditor: 
 */
import { Input, InputNumber, DatePicker, Switch } from 'antd';
import Select from './../select/Select';
import ModalTableInModelInput from './extra/ModalTableInModelInput';
import ConsoleSelect from './../select/ConsoleSelect';
import MoneyInputNumber from './extra/MoneyInputNumber';
import Cascader from './../cascader/Cascader';
import FileUploadInput from './extra/FileUploadInput';

export const FormxControlTypes = {
  INPUT: 'input',
  SELECT: 'select',
  NUMBER: 'number',
  DATE: 'datePicker',
  RANGE_PICKER: 'RangePicker',
  SWITCH: 'switch',
  TEXT_AREA: 'textArea',
  MONEY: 'money',
  FILE_UPLOAD: 'FileUploadInput',
  MODAL_TABLE: 'ModalTableInModelInput',
  CASCADER: 'cascader',
  CONSOLE_SELECT: 'consoleSelect'
}

export const ControlMap = {
  [FormxControlTypes.INPUT]: Input,
  [FormxControlTypes.NUMBER]: InputNumber,
  [FormxControlTypes.DATE]: DatePicker,
  [FormxControlTypes.SELECT]: Select,
  [FormxControlTypes.CONSOLE_SELECT]: ConsoleSelect,
  [FormxControlTypes.MODAL_TABLE]: ModalTableInModelInput,
  [FormxControlTypes.SWITCH]: Switch,
  [FormxControlTypes.TEXT_AREA]: Input.TextArea,
  [FormxControlTypes.MONEY]: MoneyInputNumber,
  [FormxControlTypes.CASCADER]: Cascader,
  [FormxControlTypes.FILE_UPLOAD]: FileUploadInput,
  [FormxControlTypes.RANGE_PICKER]: DatePicker.RangePicker
}