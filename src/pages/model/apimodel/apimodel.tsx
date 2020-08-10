import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { PageHeader, Table, Icon, IconGroup } from '@library';
import { columns, formItems, controlFormItems } from './data';
import { Button } from 'antd';
import Edit from '@library/components/crud/Edit';
import { getModelApi, saveModelApi } from './../Api';
import Qs from 'query-string';
import { AttributeItemProps, ApiModelItemProps } from './../interface';

const labelCol = { span: 4 };
const wrapperCol = { span: 20 };

export default () => {

  const query = Qs.parseUrl(window.location.href).query;
  const [visible, setVisible] = useState(false);
  const [attributes, setAttributes] = useState<AttributeItemProps[]>([]);
  const [apis, setApis] = useState<ApiModelItemProps[]>([]);
  const [curData, setCurData] = useState({});
  const [controlType, setControlType] = useState('');

  useEffect(() => {
    const model = query.model as string;
    getModelApi(model).then(({ attributes, apiModels }) => {
      setAttributes(attributes);
      setApis(apiModels || []);
    })
  }, [query.model]);

  const onCancel = useCallback(() => setVisible(false), []);

  const onOk = useCallback(async (data: ApiModelItemProps) => {

    data.locales = { cn: data.cn, en: data.en };
    delete data.en;
    delete data.cn;

    data.fieldNames = { value: data.value, label: data.label }
    delete data.value;
    delete data.label;

    setVisible(false);

    let nextApis = [];
    if (apis.find(item => item.id === data.id)) {
      nextApis = apis.map(item => item.id === data.id ? data : item)
    } else {
      nextApis = [...apis, data]
    }

    const { apiModels } = await saveModelApi(query.model as string, { apiModels: nextApis });
    setApis(apiModels);
  }, [query.model, apis]);

  const remove = useCallback(async (removeIndex: number) => {
    const nextApis = apis.filter((item, index) => index !== removeIndex);
    setApis(nextApis);
    await saveModelApi(query.model as string, { apiModels: nextApis });
  }, [apis, query.model]);

  const onValuesChange = useCallback((changeVlues) => {
    if(changeVlues.type) setControlType(changeVlues.type);
  }, []);

  const handleFormItems = useMemo(() => {
    if(!controlType) return formItems;
    const curControlFormItems = controlFormItems[controlType];
    const merge = [...formItems, ...curControlFormItems];
    if(controlType === 'modalTableInModel') merge[2].options!.dataSource = attributes;
    return merge
  }, [attributes, controlType]);

  const PHExtra = useMemo(() => (
    <Button onClick={() => setVisible(true)} type='primary'>添加</Button>
  ), []);

  const TableExtra = useMemo(() => ([
    {
      dataIndex: 'action', render: (text: string, record: ApiModelItemProps, index: number) => (
        <IconGroup>
          <Icon theme='success' icon='details' onClick={() => {
            setVisible(true);
            setControlType(record.type || '');
            setCurData({
              ...record,
              cn: record.locales?.cn,
              en: record.locales?.en,
              value: record.fieldNames?.value,
              label: record.fieldNames?.label
            })
          }} />
          <Icon onClick={() => remove(index)} theme='warning' icon='delete' />
        </IconGroup>
      )
    }
  ]), [remove]);

  return (
    <>
      <PageHeader extra={PHExtra} />
      <Table
        extra={TableExtra}
        dataSource={apis}
        columns={columns} />
      <Edit
        onValuesChange={onValuesChange}
        layout='horizontal'
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        groupNumber={1}
        initialValues={curData}
        onOk={onOk}
        onCancel={onCancel}
        formItems={handleFormItems}
        visible={visible} />
    </>
  )
}