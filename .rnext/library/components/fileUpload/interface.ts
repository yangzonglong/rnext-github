/*
 * @Author: yangzonglong
 * @Date: 2020-07-18 11:09:05
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-28 09:59:34
 * @Auditor: 
 */
import { UploadProps } from 'antd/lib/upload/interface';
import { UploadFile } from 'antd/lib/upload/interface';
import { ModalProps } from 'antd/lib/modal';

export type FileProps = {
  encoding?: string;
  fieldname?: string;
  filename?: string;
  mimetype?: string;
  originalname?: string;
  url?: string;
  size?: number;
}

export interface FileUploadRefProps {
  getFileList(): UploadFile[]
}

export interface FileUploadProps extends UploadProps {
  maxSize?: number; // 支持最大上传限制 kb为单位
  modalProps?: ModalProps;
  onOkFiles?(data: FileProps[]): void;
  only?: boolean
}