import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Table, PageHeader, Button, Loading } from '@library';
import history from '@library/app/history';
import EditModel from './_EditModel';
import { getModelsApi, registerModelApi, removeModelApi } from './Api';
import { Button as AntdButton } from 'antd';

const ButtonGroup = AntdButton.Group;
const modelFieldUrl = '/model/fields?model=';
const modelTabsUrl = '/model/tabs?model=';
const modelRelationsUrl = '/model/relations?model=';
const modalModelUrl = '/model/apimodel?model=';
const modalUniqueUrl = '/model/unique?model=';

const columns = [
  { dataIndex: 'modelName' },
  { dataIndex: 'action', width: 60 }
]

export default () => {

  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCancel = useCallback(() => setVisible(false), []);

  const onRef = useCallback(async () => {
    setLoading(true);
    const models = await getModelsApi();
    setLoading(false);
    setDataSource(models.map((item: string, index: number) => ({
      modelName: item, id: index
    })))
  }, []);

  useEffect(() => { onRef() }, [onRef]);

  const onOk = useCallback(async (modelName: string) => {
    setVisible(false);
    await registerModelApi(modelName);
    onRef();
  }, [onRef]);

  const removeModel = useCallback(async (modelName: string) => {
    await removeModelApi(modelName);
    onRef();
  }, [onRef]);

  const Extra = useMemo(() => ([
    {
      dataIndex: 'action', render: (text: string, { modelName }: any) => (
        <ButtonGroup>
          <AntdButton size='small' onClick={() => history.push(modelFieldUrl + modelName)}>字段</AntdButton>
          <AntdButton size='small' onClick={() => history.push(modelTabsUrl + modelName)}>分组</AntdButton>
          <AntdButton size='small' onClick={() => history.push(modelRelationsUrl + modelName)}>关系</AntdButton>
          <AntdButton size='small' onClick={() => history.push(modalModelUrl + modelName)}>Api模型</AntdButton>
          <AntdButton size='small' onClick={() => history.push(modalUniqueUrl + modelName)}>Unique</AntdButton>
          <AntdButton onClick={() => removeModel(modelName)} size='small'>删除</AntdButton>
        </ButtonGroup>
      )
    }
  ]), [removeModel]);

  return (
    <>
      <PageHeader extra={<Button.Create onClick={() => setVisible(true)} />} />
      <Table extra={Extra} dataSource={dataSource} columns={columns} />
      <EditModel onOk={onOk} onCancel={onCancel} visible={visible} />
      <Loading visible={loading}/>
    </>
  )
}