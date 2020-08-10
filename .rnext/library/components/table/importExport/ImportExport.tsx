import React, { memo, useCallback, useState } from 'react';
import Icon from './../../icon/Icon';
import Modal from './Modal';
import { ColumnProps } from './../interface';
import styles from './importExport.module.scss';

interface IProps {
  downloadUrl?: string,
  columns?: ColumnProps<object>[],
  importServer?: Function
}

export default memo(({ downloadUrl, columns, importServer }: IProps) => {

  const [visible, setVisible] = useState(false);

  const onDownload = useCallback(() => {
    window.open(downloadUrl)
  }, [downloadUrl]);

  const showFileUpload = useCallback(() => setVisible(true), []);
  const hideFileUpload = useCallback(() => setVisible(false), []);

  return (
    <>
      <div className={styles.box}>
        <Icon onClick={onDownload} icon='&#xe67e;' />
        <Icon onClick={showFileUpload} icon='&#xe67d;' />
      </div>
      <Modal onCancel={hideFileUpload} visible={visible} importServer={importServer} columns={columns}/>
    </>
  )
})