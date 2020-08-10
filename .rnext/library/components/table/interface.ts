/*
 * @Author: yangzonglong
 * @Date: 2020-06-01 11:14:08
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-02 16:56:42
 * @Auditor: 
 */
import React from 'react';
import { TableProps as AntdTableProps, ColumnProps as AntdColumnProps } from 'antd/lib/table';

export type FormatProps = string | 'date' | 'time' | 'money';

export type FixedProps = any | 'left' | 'right';

export type ExtraItemProps<RecordType> = {
  dataIndex: string,
  render(text: string, record: RecordType, index: number): React.ReactNode
}

export interface ColumnProps<T> extends AntdColumnProps<T> {
  format?: FormatProps;
  sorter?: boolean,
  fixed?: FixedProps,
  tooltip?: boolean
}

export interface TableProps<RecordType> extends AntdTableProps<RecordType> {
  columns: ColumnProps<RecordType>[];
  url?: string,
  extra?: ExtraItemProps<RecordType>[],
  query?: object,
  rowSelectionType?: 'radio' | 'checkbox',
  dataSource?: RecordType[],
  onDoubleClick?(record: RecordType): void
}

export type SizeProps = {
  width: number,
  height: number
}

export interface TableRefProps {
  getSelectedRows(): object[],
  onRefresh(): void
}