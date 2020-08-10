import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { PageHeader, Table, Button, Icon, IconGroup } from '@library';
import { getModelApi, saveModelApi } from './../Api';
import Qs from 'query-string';
import Edit from '@library/components/crud/Edit';
import { useDynamicList } from 'ahooks';

const columns = [
  { dataIndex: 'fields', render: (text: string[]) => text.join(',') },
  { dataIndex: 'action', width: 80 }
]

const formItems = [
  {
    name: 'fields',
    required: true,
    type: 'select',
    options: {
      dataSource: [] as any[],
      fieldNames: {
        label: 'label',
        value: 'value'
      },
      mode: 'multiple'
    }
  }
]

interface LineProps {
  fields: string[]
}

export default () => {

  const isInit = useRef(false);
  const query = Qs.parseUrl(window.location.href).query;

  const [visible, setVisible] = useState(false);
  const [attributes, setAttributes] = useState<any[]>([]);
  const [curLine, setCurLine] = useState({});
  const { list, resetList, push, remove, replace } = useDynamicList<LineProps>([]);

  useEffect(() => {
    if (isInit.current) return;
    getModelApi(query.model as string).then(({ unique = [], attributes }) => {
      isInit.current = true;
      resetList(unique.map((item: any) => ({
        fields: item
      })));
      setAttributes(attributes.map(item => ({
        label: item.fieldName,
        value: item.fieldName
      })));
    })
  }, [query.model, resetList]);

  const onCancel = useCallback(() => setVisible(false), []);

  const onOk = useCallback((line) => {
    if (line._index >= 0) {
      replace(line._index, line);
    } else {
      push(line);
    }
    setVisible(false);
  }, [replace, push]);

  const onSubmit = useCallback(async () => {
    await saveModelApi(query.model as string, { 
      unique: list.map(item => item.fields)
    })
  }, [query.model, list]);

  const PHExtra = useMemo(() => ([
    <Button.Create onClick={() => setVisible(true)} />,
    <Button.Submit onClick={onSubmit}/>
  ]), [onSubmit]);

  const TableExtra = useMemo(() => ([
    {
      dataIndex: 'action', render: (text: string, record: LineProps, index: number) => (
        <IconGroup>
          <Icon onClick={() => remove(index)} icon='delete' theme='warning' />
          <Icon icon='details' theme='success' onClick={() => {
            setCurLine({ ...record, _index: index });
            setVisible(true);
          }} />
        </IconGroup>
      )
    }
  ]), [remove]);

  const handleFormItems = useMemo(() => {
    formItems[0].options.dataSource = attributes;
    return formItems
  }, [attributes]);

  return (
    <>
      <PageHeader extra={PHExtra} />
      <Table
        extra={TableExtra}
        dataSource={list}
        columns={columns} />
      <Edit
        groupNumber={1}
        initialValues={curLine}
        onCancel={onCancel}
        onOk={onOk}
        formItems={handleFormItems}
        visible={visible} />
    </>
  )
}