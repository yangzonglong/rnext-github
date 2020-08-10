import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Table, PageHeader, Loading, Icon } from '@library';
import { getModelApi, saveModelApi } from '../Api';
import Qs from 'query-string';
import { Button, Switch, Input } from 'antd';
import EditField from './_EditField';
import PreviewForm from './_PreviewForm';
import PreviewCrud from './_PreviewCrud';
import { AttributeItemProps } from '../interface';

const objToJSONStr = (obj: undefined | object) => obj && JSON.stringify(obj);
const brToStr = (br: undefined | boolean) => <Switch size='small' checked={!!br} />;

const placeholder = 'field/locales';

const columns = [
  { dataIndex: 'fieldName', width: 200 },
  { dataIndex: 'controlType', width: 150 },
  { dataIndex: 'tableShowFlag', render: brToStr },
  { dataIndex: 'formShowFlag', render: brToStr },
  { dataIndex: 'rules', ellipsis: true, tooltip: true, render: objToJSONStr },
  { dataIndex: 'locales', width: 150, ellipsis: true, tooltip: true, render: objToJSONStr },
  { dataIndex: 'options', ellipsis: true, tooltip: true, render: objToJSONStr },
  { dataIndex: 'action', width: 60 }
];

export default () => {

  const query = Qs.parseUrl(window.location.href).query;
  const [dataSource, setDataSource] = useState<AttributeItemProps[]>([]);
  const [curData, setCurData] = useState<AttributeItemProps>({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  
  const [preCrudVisible, setPreCrudVisible] = useState(false);
  const hidePreCrudVisible = useCallback(() => setPreCrudVisible(false), []);

  const [preFormVisible, setPreFormVisible] = useState(false);
  const hidePreFormVisible = useCallback(() => setPreFormVisible(false), []);

  useEffect(() => {
    getModelApi(query.model as string).then(({ attributes }) => {
      setDataSource(attributes)
    })
  }, [query.model]);

  const showEditField = useCallback((data?: AttributeItemProps) => {
    setVisible(true);
    setCurData(data || {});
  }, []);

  const hideEditField = useCallback(() => setVisible(false), []);

  const okEditField = useCallback((data: AttributeItemProps) => {
    const repeat = dataSource.find(item => item.fieldName === data.fieldName);
    if (repeat) {
      setDataSource(dataSource.map(item => {
        return item.fieldName === data.fieldName ? data : item
      }))
    } else {
      setDataSource([...dataSource, data])
    }
    setVisible(false);
  }, [dataSource]);

  const removeFieid = useCallback((fieldName: string) => {
    setVisible(false);
    setDataSource(dataSource.filter(item => item.fieldName !== fieldName))
  }, [dataSource]);

  const saveModel = useCallback(async () => {
    setLoading(true);
    const { attributes } = await saveModelApi(query.model as string, { attributes: dataSource });
    setDataSource(attributes);
    setLoading(false);
  }, [dataSource, query.model]);

  const selectFields = useMemo(() => dataSource.map(item => ({
    name: item.fieldName,
    value: item.fieldName
  })),[dataSource]);

  const Extra = useMemo(() => [
    <Input.Search onSearch={setSearchStr} placeholder={placeholder} key='search' />,
    <Button onClick={() => showEditField()} ghost type='primary' key='add'>+添加</Button>,
    <Button onClick={() => setPreCrudVisible(true)} ghost type='primary' key='crud'>预览Crud</Button>,
    <Button onClick={() => setPreFormVisible(true)} ghost type='primary' key='view'>预览Form</Button>,
    <Button onClick={saveModel} type='primary' key='save'>保存</Button>
  ], [showEditField, saveModel]);

  const handleDataSource = useMemo(() => {
    if (!searchStr) return dataSource;
    return dataSource.filter(item => {

      const locales = item.locales && typeof item.locales === 'string' ? JSON.parse(item.locales) : (item.locales || {});
      const cn = locales.cn || '', en = locales.en || '';

      if (item.fieldName!.indexOf(searchStr) >= 0) return true;
      if (cn.indexOf(searchStr) >= 0 || en.indexOf(searchStr) >= 0) return true;
      
      return false
    })
  }, [dataSource, searchStr]);

  const TableExtra = useMemo(() => ([
    {
      dataIndex: 'action', render: (text: string, record: AttributeItemProps) => {
        return record.fieldName !== 'id' && (
          <Icon onClick={() => showEditField(record)} icon='details' theme='success' />
        )
      }
    }
  ]), [showEditField]);

  return (
    <>
      <PageHeader extra={Extra} />
      <Table 
        onDoubleClick={showEditField} 
        extra={TableExtra} 
        rowKey='fieldName' 
        dataSource={handleDataSource} 
        columns={columns} />
      <EditField 
        fields={selectFields as any[]}
        onRemove={removeFieid} 
        onClose={hideEditField} 
        curData={curData} 
        onOk={okEditField} 
        visible={visible} />
      <PreviewForm 
        modelName={query.model as string} 
        onCancel={hidePreFormVisible} 
        visible={preFormVisible} />
      <PreviewCrud 
        onCancel={hidePreCrudVisible} 
        modelName={query.model as string} 
        visible={preCrudVisible}/>
      <Loading visible={loading} />
    </>
  )
}