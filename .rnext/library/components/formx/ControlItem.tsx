import React, { memo, useCallback, useMemo } from 'react';
import { FormItemProps } from './interface';
import { ControlMap, FormxControlTypes } from './data';
import { handleRowColStyle } from './util';
import { Form, Col } from 'antd';

interface IProps {
  formItem: FormItemProps;
  disabled: boolean;
  rules: any[];
  label: string;
  groupNumber?: number;
  value?: any;
  id?: string;
  onChange?(value: any, id: string): void;
}

const FormItem = ({ formItem, value, id, onChange, groupNumber, disabled, rules, label }: IProps) => {

  const Control: any = ControlMap[formItem.type!] || ControlMap[FormxControlTypes.INPUT];
  const valuePropName = formItem.type === 'switch' ? 'checked' : 'value';
  const rowColStyle = useMemo(() => handleRowColStyle(groupNumber), [groupNumber])

  const _onChange = useCallback((e) => onChange?.(e, id!), [id, onChange]);
  
  return (
    <Col span={rowColStyle.span}>
      <Form.Item name={formItem.name} label={label} rules={rules} valuePropName={valuePropName}>
        <Control {...{ [valuePropName]: value }} onChange={_onChange} id={id} disabled={disabled} {...formItem.options} />
      </Form.Item>
    </Col>
  )
}

function equal(prevProps: IProps, nextProps: IProps) {
  return prevProps.formItem === nextProps.formItem
    && prevProps.value === nextProps.value
    && prevProps.disabled === nextProps.disabled
    && prevProps.label === nextProps.label
    && prevProps.rules === nextProps.rules
}

export default memo(FormItem, equal)