/*
 * @Author: yangzonglong
 * @Date: 2020-05-29 10:12:12
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-18 14:00:48
 * @Auditor: 
 */
import React from 'react';
import { FormatProps, ColumnProps } from './interface';
import moment from 'moment';
import { Switch } from 'antd';

const ROW_HEIGHT = 35;
const PAGINATION_HEIGHT = 32;

export function formatRenderText(text: string, format: FormatProps) {
  if(!text || !format) return text;
  if (format === 'time') return moment(text).format(window.$app.MOMENT_FORMAT_TIME);
  if (format === 'date') return moment(text).format(window.$app.MOMENT_FORMAT_DATE);
  if (format === 'money') return `${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (format === 'switch') return <Switch checked={!!text}/>;
  return text
}

export function handleTablePageSize(offsetHeight: number) {
  offsetHeight = offsetHeight - ROW_HEIGHT - PAGINATION_HEIGHT;
  const pageSize = Math.floor(offsetHeight / ROW_HEIGHT);
  return pageSize
}

export function getScroll<T>(width: number, height: number, exceed: boolean, columns: ColumnProps<T>[]) {
  let x = undefined;
  const widthTotal = columns.reduce((next: number, cur) => {
    return next += (Number(cur.width) || 0)
  }, 0)
  if(widthTotal > width) x = widthTotal;
  return { x, y: exceed ? height - 10 : undefined }
}