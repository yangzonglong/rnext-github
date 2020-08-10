import React, { useMemo, useState, useCallback } from 'react';
import { PageHeader, Table, ImportExport, ModalTableInModel, Button, Materiel } from '@library';
import { Button as AButton, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const columns = [
  { dataIndex: 'projectNumber', width: 200, ellipsis: true, tooltip: true },
  { dataIndex: 'projectName', width: 200 },
  { dataIndex: 'budget', format: 'money', width: 150 },
  { dataIndex: 'contractAmount', width: 150 },
  { dataIndex: 'startTime', width: 150 },
  { dataIndex: 'endTime', width: 150 },
  { dataIndex: 'createdAt', width: 150, format: 'time', sorter: true },
  { dataIndex: 'updatedAt', width: 150, format: 'time' },
  { dataIndex: 'action', fixed: 'right', width: 100 }
]

const importColumns = [
  { dataIndex: 'materialCode', width: 150 },
  { dataIndex: 'materialDesc', width: 150 },
  { dataIndex: 'stockTypeCode', width: 150 },
  { dataIndex: 'plantCode', width: 150 },
  { dataIndex: 'storageLocationCode', width: 150 },
  { dataIndex: 'reserveQty', width: 100 }
]

const fieldNames = {
  value: 'project',
  label: 'inputBindProject'
}

export default () => {

  const [visible, setVisible] = useState(false);
  const onCancel = useCallback(() => setVisible(false), []);

  const onOk = useCallback((rows) => {
    setVisible(false);
    alert(`选中条数：${rows.length}`)
  }, []);

  const [materielVisible, setMaterielVisible] = useState(false);
  const cancelMateriel = useCallback(() => setMaterielVisible(false), []);

  const importServer = useCallback((newRows) => {
    console.log(newRows);
    return true
  }, []);

  const Extend = useMemo(() => {
    return [
      // 可以通过指定dataIndex 来自定义列的内容及样式
      { dataIndex: 'projectName', render: (text: string) => <span>{text}</span> }
    ]
  }, []);

  const Btns = useMemo(() => {
    return [
      <Dropdown overlay={
        <Menu onClick={e => {
          setVisible(true)
        }}>
          <Menu.Item key='user'>用户选择</Menu.Item>
        </Menu>
      }>
        <AButton type='primary' ghost>标准数据选择控件 <DownOutlined /></AButton>
      </Dropdown>,
      <AButton onClick={() => setMaterielVisible(true)} key='materiel' type='primary' ghost>物料选择控件</AButton>,
      // 使用带权限控制的按钮
      <Button.Create key='create' />,
      <span className='wingBlank'/>,
      <ImportExport importServer={importServer} columns={importColumns}/>
    ]
  }, [importServer]);

  return (
    <>
      <PageHeader extra={Btns} />
      <Table url='/bk/api/project/Project/find' columns={columns} extra={Extend} />
      <ModalTableInModel 
        fieldNames={fieldNames}
        moduleName='purplan' 
        modelName='Head' 
        onOk={onOk} 
        onCancel={onCancel} 
        visible={visible} />
      <Materiel onOk={() => {}} onCancel={cancelMateriel} visible={materielVisible}/>
    </>
  )
}