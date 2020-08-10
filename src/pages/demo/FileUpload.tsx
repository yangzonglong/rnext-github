import React, { useState, useMemo, useRef } from 'react';
import { PageHeader } from '@library';
import FileUpload from '@library/components/fileUpload/FileUpload';
import { FileUploadRefProps } from '@library/components/fileUpload/interface';
import { Button } from 'antd';

export default () => {

  const fileUploadRef = useRef<FileUploadRefProps>(null);
  const [visible, setVisible] = useState(false);
  
  const modalProps = useMemo(() => ({
    visible,
    onCancel: () => setVisible(false),
    onOk: () => {
      setVisible(false);
      alert(`上传文件总数是：${fileUploadRef.current?.getFileList().length}`)
    }
  }), [visible]);

  return (
    <>
      <PageHeader extra={
        <Button onClick={() => setVisible(true)} ghost type='primary'>Modal上传附件</Button>}
      />
      <FileUpload/>
      <FileUpload ref={fileUploadRef} modalProps={modalProps}/>
    </>
  )
}