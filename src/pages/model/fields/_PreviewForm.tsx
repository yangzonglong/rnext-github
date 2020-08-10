import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import Formx from '@library/components/formx/Formx';
import { FormxRefProps } from '@library/components/formx/interface';
import useModel from '@library/utils/use/useModel/useModel';
import { IPFS_MODULE } from '@library/app/automatic/package';
import JSONViewer from 'react-json-viewer';
import { Modal } from 'antd';

interface IProps {
  visible: boolean,
  onCancel(): void,
  modelName: string
}

export default memo(({ visible, onCancel, modelName }: IProps) => {

  const formxRef = useRef<FormxRefProps>(null);
  const [refFlag, setRefFlag] = useState(1);
  const [data, setData] = useState({});
  const { formItems } = useModel({ modelUrl: `/bk/ipfs/${IPFS_MODULE}/${modelName}/getModel` }, [refFlag]);

  useEffect(() => {
    if (!visible) return;
    setRefFlag(prev => ++prev);
  }, [visible]);

  const onOk = useCallback(async () => {
    const values = await formxRef.current?.validateFields();
    setData(values || {})
  }, []);

  return (
    <Modal
      title='预览'
      onCancel={onCancel}
      onOk={onOk}
      visible={visible}
      width={1000}>
      <Formx ref={formxRef} formItems={formItems} />
      <JSONViewer json={data} />
    </Modal>
  )
})