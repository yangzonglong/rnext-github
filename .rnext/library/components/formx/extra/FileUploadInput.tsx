import React, { memo, useState, useMemo, useCallback } from 'react';
import { Input } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import FileUpload from './../../fileUpload/FileUpload';
import { FileProps } from './../../fileUpload/interface';

const styles = { color: 'rgba(0, 0, 0, 0.25)' };

interface IProps {
  id: string;
  value: string;
  onChange(value: string, id: string): void;
}

export default memo(({ id, onChange, value }: IProps) => {

  const [visible, setVisible] = useState(false);

  const showFileUpload = useCallback(() => setVisible(true), []);
  const hideFileUpload = useCallback(() => setVisible(false), []);

  const onOk = useCallback((files: FileProps[]) => {
    setVisible(false);
    onChange(files.map(item => item.url).join(','), id)
  }, [id, onChange]);

  const modalProps = useMemo(() => ({
    visible,
    onCancel: hideFileUpload
  }), [visible, hideFileUpload]);

  return (
    <>
      <Input value={value} suffix={<FileAddOutlined onClick={showFileUpload} style={styles} />} />
      <FileUpload onOkFiles={onOk} modalProps={modalProps} />
    </>
  )
})