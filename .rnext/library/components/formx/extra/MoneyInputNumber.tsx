import React, { memo, useCallback } from 'react';
import { InputNumber } from 'antd';

interface IProps {
  id: string,
  onChange(value: number, id: string): void,
  value: number
}

const parser = (value: string | undefined) => {
  if (value) return value.replace(/\$\s?|(,*)/g, '');
  return '';
}

const formatter = (value: string | number | undefined) => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}


export default memo(({ value, onChange, id }: IProps) => {

  const _onChange = useCallback((value: number | string | undefined) => {
    onChange(value as number, id)
  }, [onChange, id]);

  return (
    <InputNumber
      maxLength={14}
      formatter={formatter}
      parser={parser}
      onChange={_onChange}
      value={value} />
  )
})