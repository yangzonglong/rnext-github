/*
 * @Author: yangzonglong
 * @Date: 2020-06-15 09:44:41
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-06-30 13:56:19
 * @Auditor: 
 */

export type OptionItemProps = {
  id: string,
  [propName: string]: any
}

export interface ISelected {
  label: string;
  value: string;
}

export type FormxChange = (value: string | string[], id: string) => void;
export type SelectChange = (selected: ISelected | ISelected[], option: Record<string, any>) => void;

export interface SelectProps {
  value?: string;
  id?: string, // antd form 受控状态, 请勿手动指定
  cacheKey?: string,
  url: string;
  query?: object;
  fieldNames: ISelected;
  onChange?: FormxChange | SelectChange;
  dataSource?: OptionItemProps[];
  extra?: string[], // 额外输出的key
  rtnDataAfter?(data: any): void
}

export interface ConsoleCode {
  ConsoleCodeValues: {
    id: string,
    codeDesc: string,
    codeValue: string
  }
}