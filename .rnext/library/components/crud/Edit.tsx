import React, { memo, useMemo, useRef, useCallback } from 'react';
import Formx from './../formx/Formx';
import { EditProps } from './interface';
import { FormxRefProps } from './../formx/interface';
import { Button, Modal } from 'antd';

export default memo(({
  visible,
  formItems,
  onCancel,
  initialValues,
  onOk,
  groupNumber,
  onRemove,
  onValuesChange,
  labelCol,
  wrapperCol,
  layout
}: EditProps) => {

  const formxRef = useRef<FormxRefProps>(null);

  const _onOk = useCallback(async () => {
    const values = await formxRef.current?.validateFields();
    onOk({ ...initialValues, ...values })
  }, [onOk, initialValues]);

  const _onRemove = useCallback(async () => {
    onRemove?.(initialValues)
  }, [onRemove, initialValues]);

  const Title = useMemo(() => {
    if (initialValues.id) return '编辑';
    return '新增';
  }, [initialValues]);

  const Footer = useMemo(() => ([
    initialValues.id && onRemove && <Button onClick={_onRemove} danger key='delete'>删除</Button>,
    <Button onClick={_onOk} key='confirm' type='primary'>确定</Button>
  ]), [initialValues, _onOk, _onRemove, onRemove]);

  return (
    <Modal
      destroyOnClose
      title={Title}
      footer={Footer}
      onCancel={onCancel}
      width={800}
      visible={visible}>
      <Formx
        layout={layout || 'vertical'}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        onValuesChange={onValuesChange}
        ref={formxRef}
        initialValues={initialValues}
        groupNumber={groupNumber || 3}
        formItems={formItems} />
    </Modal>
  )
})