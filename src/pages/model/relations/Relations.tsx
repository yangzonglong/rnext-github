import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { PageHeader, Table, Icon } from '@library';
import Edit from '@library/components/crud/Edit';
import { getModelsApi, saveModelApi, getModelApi } from '../Api';
import { RelationItemProps } from '../interface';
import { columns, formItems } from './data';
import { Button } from 'antd';
import Qs from 'query-string';

const curData = {};

export default () => {

  const query = Qs.parseUrl(window.location.href).query;
  const [models, setModels] = useState([]);
  const [dataSource, setDataSource] = useState<RelationItemProps[]>([]);
  const [visible, setVisible] = useState(false);
  const onCancel = useCallback(() => setVisible(false), []);

  useEffect(() => {
    getModelsApi().then(models => {
      setModels(models.map((item: string) => ({ model: item })));
    })
    getModelApi(query.model as string).then(({ relations }) => {
      setDataSource(relations || [])
    })
  }, [query.model]);

  const onOk = useCallback(async (data: RelationItemProps) => {
    setVisible(false);

    let nextDataSource = [];
    if(dataSource.find(item => item.model === data.model)) {
      nextDataSource = dataSource.map(item => item.model === data.model ? data : item)
    }else {
      nextDataSource = [...dataSource, data]
    }

    const { relations } = await saveModelApi(query.model as string, { relations: nextDataSource });
    setDataSource(relations);
  }, [dataSource, query.model]);

  const remove = useCallback(async (removeIndex: number) => {
    const nextDataSource = dataSource.filter((item, index) => index !== removeIndex);
    setDataSource(nextDataSource);
    const { relations } = await saveModelApi(query.model as string, { relations: nextDataSource });
    setDataSource(relations); 
  }, [dataSource, query.model]);

  const handleFormItems = useMemo(() => {
    formItems[0].options.dataSource = models;
    return formItems
  }, [models]);

  const PHExtra = useMemo(() => (
    <Button onClick={() => setVisible(true)} type='primary'>添加</Button>
  ), []);
  
  const Extra = useMemo(() => ([
    { dataIndex: 'action', render: (text: string, record: RelationItemProps, index: number) => (
      <Icon onClick={() => remove(index)} icon='delete' theme='warning'/>
    )}
  ]), [remove]);

  return (
    <>
      <PageHeader extra={PHExtra} />
      <Table 
        extra={Extra}
        dataSource={dataSource} 
        columns={columns} />
      <Edit
        initialValues={curData}
        onOk={onOk}
        formItems={handleFormItems}
        onCancel={onCancel}
        visible={visible} />
    </>
  )
}