import React, { memo, useState, useCallback, useMemo } from 'react';
import { Modal, Steps, Upload, Button, Result } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import XLSX from 'xlsx';
import Table from './../../table/Table';
import { parse } from './../../../utils/json/json';
import { ColumnProps } from './../interface';

const modalBodyStyle = {
  display: 'flex',
  flexDirection: 'column' as any,
  maxHeight: '500px'
};

interface IProps {
  visible: boolean;
  onCancel?(): void;
  columns?: ColumnProps<object>[];
  importServer?: Function
}

export default memo(({ columns, importServer, visible, onCancel }: IProps) => {

  const [current, setCurrent] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const isComplete = useMemo(() => current === 2, [current]);

  const beforeUpload = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const wb = XLSX.read(data, { type: 'binary' });
      const worksheet = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
      setCurrent(1);
      setDataSource(parse(worksheet))
    }
    reader.readAsBinaryString(file);
    return false
  }, []);

  const onSave = useCallback(async () => {
    if (importServer) {
      setLoading(true);
      await importServer(dataSource);
      setLoading(false);
      setCurrent(current => ++current);
    }
  }, [importServer, dataSource]);

  const onComplete = useCallback(() => {
    onCancel?.();
    setDataSource([]);
    setCurrent(0);
  }, [onCancel]);

  const Footer = useMemo(() => ([
    current > 0 && !isComplete && (
      <Button disabled={loading} onClick={() => setCurrent(current - 1)}>{window.$app.t('prevStep')}</Button>
    ),
    isComplete ? (
      <Button onClick={onComplete} type='primary'>完成</Button>
    ) : current !== 0 ? (
      <Button onClick={onSave} loading={loading} type='primary'>{window.$app.t('nextStep')}</Button>
    ) : null
  ]), [current, isComplete, loading, onSave, onComplete]);

  return (
    <Modal
      onCancel={onCancel}
      footer={Footer}
      visible={visible}
      closable={!loading}
      destroyOnClose
      width={900}
      title={window.$app.t('tabImportExportModalTitle')}
      bodyStyle={modalBodyStyle}>
      <Steps size='small' current={current}>
        <Steps.Step title={window.$app.t('tableImportExportStep1')} />
        <Steps.Step title={window.$app.t('tableImportExportStep2')} />
        <Steps.Step title={window.$app.t('tableImportExportStep3')} />
      </Steps>
      <span className='whiteSpace' />
      {current === 0 ? (
        <Upload.Dragger accept='.xlsx' beforeUpload={beforeUpload} showUploadList={false}>
          <p className='ant-upload-drag-icon'><InboxOutlined /></p>
          <p className='ant-upload-text'>{window.$app.t('uploadOperationTip')}</p>
          <p className='ant-upload-hint'>{window.$app.t('tabImportExportTip')}</p>
        </Upload.Dragger>
      ) : current === 1 ? (
        <Table columns={columns || []} dataSource={dataSource} />
      ) : (
            <Result
              title={window.$app.t('importSucceeded')}
              subTitle={`${window.$app.t('importSucceededDesc')} ${dataSource.length}`}
              status='success' />
          )}
    </Modal>
  )
})