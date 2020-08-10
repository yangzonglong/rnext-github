import React, { memo, useCallback, useState, forwardRef, useImperativeHandle } from 'react';
import { Upload, Modal } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { PACKAGE_NAME } from './../../app/automatic/package';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { FileUploadProps, FileUploadRefProps } from './interface';

const { Dragger } = Upload;

const DEFAULT_SIZE = 51200; // 默认50M 单位KB
const DEFAULT_URL = '/bk/uploadIpfs/';
const DEFAULT_ACCEPT = '.jpg,.png,.jpeg,.gif,.pdf,.xlsx,.zip,.rar,.txt,.docx';
const DEFAULT_MODAL_PROPS = { title: '附件上传', width: 700 };

const FileUpload = (props: FileUploadProps, ref: React.Ref<FileUploadRefProps>) => {

  const { accept, maxSize, modalProps } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useImperativeHandle(ref, () => ({
    getFileList: () => fileList.filter(item => item.status === 'done')
  }));

  const beforeUpload = useCallback((file) => {
    const _maxSize = maxSize || DEFAULT_SIZE;
    if (_maxSize * 1024 < file.size) return false;
    if(props.only && fileList.length > 1) return false;
    return true
  }, [maxSize, props.only, fileList]);

  const onDownload = useCallback((file) => {
    alert(111)
  }, []);

  const _onChange = useCallback((info: UploadChangeParam) => {
    const fileList = [...info.fileList.filter(item => item.status)];
    setFileList(fileList);
    props.onChange && props.onChange(info);
  }, [props]);

  const _onOk = useCallback(() => {
   props.onOkFiles?.(fileList.map(file => file.response));
  }, [fileList, props.onOkFiles]);

  const wrap = useCallback((children: React.ReactElement) => {
    if (!modalProps) return children;
    const handleModalProps = { ...DEFAULT_MODAL_PROPS, ...modalProps, onOk: _onOk };
    return <Modal {...handleModalProps}>{children}</Modal>
  }, [modalProps, _onOk]);

  return wrap(<Dragger
    {...props}
    beforeUpload={beforeUpload}
    action={DEFAULT_URL + PACKAGE_NAME}
    onDownload={onDownload}
    listType='picture'
    fileList={fileList}
    onChange={_onChange}
    accept={accept || DEFAULT_ACCEPT}>
    <p className='ant-upload-drag-icon'><InboxOutlined /></p>
    <p className='ant-upload-text'>选择文件或拖动文件进行上传</p>
    <p className='ant-upload-hint'>
      支持格式：{accept || DEFAULT_ACCEPT}，上传大小限制：{DEFAULT_SIZE || maxSize} KB
      </p>
  </Dragger>)
}

export default memo(forwardRef(FileUpload));