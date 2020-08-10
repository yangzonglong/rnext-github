import React, { memo } from 'react';
import { CRUD, units } from '@library';
import { IPFS_MODULE } from '@library/app/automatic/package';
import { Modal } from 'antd';
interface IProps {
  visible: boolean;
  modelName: string;
  onCancel(): void
}

const BASE_URL = `/bk/ipfs/${IPFS_MODULE}`;
const bodyStyle = { height: '400px', display: 'flex', flexDirection: 'column' as any };

export default memo(({ visible, modelName, onCancel }: IProps) => {

  const { columns, formItems } = units.useModel({ modelUrl: `${BASE_URL}/${modelName}/getModel` });

  return (
    <Modal 
      onCancel={onCancel}
      bodyStyle={bodyStyle}
      visible={visible} 
      width={1000} 
      title='预览CRUD'>
      <CRUD 
        baseUrl={`${BASE_URL}/${modelName}`} 
        formItems={formItems} 
        columns={columns}/>
    </Modal>
  )
})