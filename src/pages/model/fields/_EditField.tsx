import React, { memo, useCallback, useState, useMemo, useRef, useEffect } from 'react';
import { Formx, Tabs } from '@library';
import { FormxRefProps } from '@library/components/formx/interface';
import { Drawer, Button } from 'antd';
import { tabsFormItems, typeExtraMap, tabsData } from './data';
import { AttributeItemProps } from '../interface';
import { handleCascaderOptionsModel, handleField, handleTabFormData } from './util';

const labelCol = { span: 4 };
const wrapperCol = { span: 20 };
const buttonBoxStyle = { textAlign: 'right' as any };
const whiteSpace = { height: '20px' };

interface TabFormxRef {
  [id: string]: FormxRefProps
}

interface IProps {
  visible: boolean;
  onOk(values: AttributeItemProps): void;
  onClose(): void;
  onRemove(fieldName: string): void;
  curData: AttributeItemProps;
  fields: Array<{ name: string, value: string }>
}

export default memo(({ visible, onOk, curData, onClose, onRemove, fields }: IProps) => {

  const formxRef = useRef<TabFormxRef>({});
  const extraFormxRef = useRef<FormxRefProps>(null);
  const [type, setType] = useState('');
  const [curTabId, setCurTabId] = useState(tabsData[0].id);

  useEffect(() => {
    if (curData.controlType) setType(curData.controlType);
  }, [curData]);

  const createRef = useCallback((ref, id) => {
    formxRef.current[id] = ref;
  }, []);

  const onValuesChange = useCallback((changedValues) => {
    const name = Object.keys(changedValues)[0];
    if (name === 'controlType') setType(changedValues[name]);
  }, []);

  const extraFormItems = useMemo(() => {
    const extra = typeExtraMap[type] || [];
    return extra
  }, [type]);

  const _onOk = useCallback(async () => {
    let body = {};
    for (const k in formxRef.current) {
      const curRef = formxRef.current[k];
      const values = await curRef.validateFields();
      if (!values) return;
      body = { ...body, ...handleTabFormData(k,values) };
    }

    const extraValues = await extraFormxRef.current?.validateFields();
    onOk(handleField({ ...body, options: extraValues }, type));
  }, [onOk, type]);

  const _onRemove = useCallback(() => {
    onRemove(curData.fieldName!)
  }, [curData, onRemove]);

  const onChangeTab = useCallback(setCurTabId, []);

  const mainData = useMemo(() => {
    const locales = (curData.locales || {}) as any;
    return {
      ...curData,
      ...locales
    }
  }, [curData]);

  const optionsData = useMemo(() => {
    const options = curData.options || {};
    const model = handleCascaderOptionsModel(options.model); // cascader
    return {
      ...options,
      ...options.fieldNames,
      ...model,
      extra: options.extra ? JSON.stringify(options.extra) : '',
      dataSource: options.dataSource ? JSON.stringify(options.dataSource) : ''
    }
  }, [curData]);

  const handleTabsFormItems = useMemo(() => {
    tabsFormItems.base[3].options!.dataSource = fields;
    tabsFormItems.base[4].options!.dataSource = fields;
    return tabsFormItems
  }, [fields]);

  return (
    <Drawer
      destroyOnClose
      onClose={onClose}
      footer={<div style={buttonBoxStyle}>
        <Button danger onClick={_onRemove}>删除</Button>
        <Button onClick={_onOk} type='primary'>保存</Button>
      </div>}
      visible={visible}
      width={600}
      title='编辑字段'>
      <Tabs onChange={onChangeTab} curTabId={curTabId} tabs={tabsData} />
      <p style={whiteSpace} />
      {Object.keys(handleTabsFormItems).map(item => (
        <div key={item} hidden={item !== curTabId}>
          <Formx
            initialValues={mainData}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            layout='horizontal'
            onValuesChange={onValuesChange}
            groupNumber={1}
            formItems={handleTabsFormItems[item]}
            ref={ref => createRef(ref, item)} />
        </div>
      ))}
      <div hidden={curTabId !== 'form'}>
        <Formx
          initialValues={optionsData}
          ref={extraFormxRef}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          layout='horizontal'
          groupNumber={1}
          formItems={extraFormItems} />
      </div>
    </Drawer>
  )
})