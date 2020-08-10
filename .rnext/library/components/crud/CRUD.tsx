import React, { memo, useMemo, useState, useCallback, useRef } from 'react';
import Table from './../table/Table';
import PageHeader from './../pageHeader/PageHeader';
import Button from './../button/Button';
import Edit from './Edit';
import { CRUDProps } from './interface';
import { snedAction } from './crudApi';
import { TableRefProps } from './../table/interface';
import Icon from './../icon/Icon';
import { message } from 'antd';

const actionColumn = { dataIndex: 'action', width: 50, fixed: 'right' };

function CRUD({ 
  baseUrl, 
  columns, 
  urls, 
  formItems, 
  saveDataAfter, 
  saveDataBefore, 
  getDataAfter, 
  showCreateModalBefore,
  onValuesChange
}: CRUDProps) {

  const tableRef = useRef<TableRefProps>(null);
  const [visible, setVisible] = useState(false);
  const [curLine, setCurLine] = useState<any>({});

  const showEdit = useCallback(async (line?: any) => {
    let handleLine = line;
    if (line && getDataAfter) handleLine = await getDataAfter(line);

    if(!line) showCreateModalBefore?.();

    setVisible(true);
    setCurLine(handleLine || {});
  }, [getDataAfter, showCreateModalBefore]);

  const hideEdit = useCallback(() => {
    setVisible(false);
    setCurLine({});
  }, []);

  const { findUrl, removeUrl, updateUrl, addUrl } = useMemo(() => {
    const findUrl = urls?.findUrl || (baseUrl + '/query');
    const removeUrl = urls?.removeUrl || (baseUrl + '/del');
    const updateUrl = urls?.updateUrl || (baseUrl + '/put');
    const addUrl = urls?.addUrl || (baseUrl + '/put');
    return { findUrl, removeUrl, updateUrl, addUrl }
  }, [baseUrl, urls]);

  const onOk = useCallback(async (values: any) => {
    setVisible(false);
    const action = values.id ? updateUrl : addUrl;

    let data = values;
    if (saveDataBefore) data = await saveDataBefore(values);
    if (typeof data === 'string') return message.warning(data);

    const result = await snedAction(action, { data });
    if (saveDataAfter) saveDataAfter(data, result);

    tableRef.current?.onRefresh();
  }, [updateUrl, addUrl, saveDataBefore, saveDataAfter]);

  const remove = useCallback(async ({ id }: { id: string }) => {
    setVisible(false);
    await snedAction(removeUrl + '/' + id, { data: { id } });
    tableRef.current?.onRefresh();
  }, [removeUrl]);

  const onDoubleClick = useCallback((record) => showEdit(record), [showEdit]);

  const Extra = useMemo(() => (
    <Button.Create onClick={() => showEdit()} key='create' />
  ), [showEdit]);

  const TableExtra = useMemo(() => ([
    {
      dataIndex: 'action', render: (text: string, record: any) => (
        <Icon onClick={() => showEdit(record)} icon='details' theme='success' key='details' />
      )
    }
  ]), [showEdit]);

  const handleColumns = useMemo(() => [...columns, actionColumn], [columns]);

  return (
    <>
      <PageHeader extra={Extra} />
      <Table
        onDoubleClick={onDoubleClick}
        ref={tableRef}
        columns={handleColumns}
        url={findUrl}
        extra={TableExtra} />
      <Edit
        onOk={onOk}
        onRemove={remove}
        initialValues={curLine}
        onValuesChange={onValuesChange}
        onCancel={hideEdit}
        visible={visible}
        formItems={formItems} />
    </>
  )
}

export default memo(CRUD);