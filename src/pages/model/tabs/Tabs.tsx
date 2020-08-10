import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Table, PageHeader, Icon, IconGroup, Loading } from '@library';
import Edit from '@library/components/crud/Edit';
import { Button } from 'antd';
import { columns, formItems } from './data';
import Qs from 'query-string';
import ViewForm from './_PreviewForm';
import { getModelApi, saveModelApi } from './../Api';
import { AttributeItemProps, TabItemProps } from './../interface';

export default () => {

  const query = Qs.parseUrl(window.location.href).query;
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState<TabItemProps[]>([]);
  const [curData, setCurData] = useState<TabItemProps>({});
  const [attributes, setAttributes] = useState<AttributeItemProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getModelApi(query.model as string).then(({ attributes, tabs }) => {
      setAttributes(attributes);
      setDataSource(tabs || []);
    })
  }, [query.model]);

  const onCancel = useCallback(() => setVisible(false), []);
  const showEdit = useCallback((data: TabItemProps) => {
    setVisible(true);
    setCurData({...data, cn: data.locales?.cn, en: data.locales?.en })
  }, []);

  const onOk = useCallback(async (data: TabItemProps) => {
    setVisible(false);

    data.locales = { cn: data.cn, en: data.en };
    delete data.cn;
    delete data.en;

    let nextDataSource = [];
    if(dataSource.find(item => item.id === data.id)) {
      nextDataSource = dataSource.map(item => item.id === data.id ? data : item)
    }else {
      nextDataSource = [...dataSource, data]
    }

    setLoading(true);
    const { tabs } = await saveModelApi(query.model as string, { tabs: nextDataSource });
    setLoading(false);
    setDataSource(tabs)
  }, [query.model, dataSource]);

  const remove = useCallback(async (id: string) => {
    const nextDataSource = dataSource.filter(item => item.id !== id);
    setDataSource(nextDataSource);
    setLoading(true);
    await saveModelApi(query.model as string, { tabs: nextDataSource });
    setLoading(false);
  }, [dataSource, query.model]);

  const handleFormItems = useMemo(() => {
    if(formItems[3].options) formItems[3].options.dataSource = attributes;
    return formItems
  }, [attributes]);

  const PHExtra = useMemo(() => ([
    <Button ghost type='primary' onClick={() => setVisible(true)}>预览Form</Button>,
    <Button type='primary' onClick={() => setVisible(true)}>添加</Button>
  ]), []);
  
  const Extra = useMemo(() => ([
    { dataIndex: 'action', render: (text: string, record: TabItemProps) => (
      <IconGroup>
        <Icon onClick={() => showEdit(record)} theme='success' icon='details' key='details'/>
        <Icon onClick={() => remove(record.id!)} theme='warning' icon='delete' key='delete'/>
      </IconGroup>
    )}
  ]), [remove, showEdit]);

  return (
    <>
      <PageHeader extra={PHExtra} />
      <Table 
        extra={Extra}
        dataSource={dataSource} 
        columns={columns} />
      <Edit 
        groupNumber={1}
        initialValues={curData} 
        onOk={onOk} 
        onCancel={onCancel} 
        formItems={handleFormItems} 
        visible={visible} />
      <Loading visible={loading}/>
      <ViewForm modelName={query.model as string}/>
    </>
  )
}