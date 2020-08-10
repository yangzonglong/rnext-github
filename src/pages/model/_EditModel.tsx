import React, { memo, useState, useCallback } from 'react';
import { Input, message, Modal } from 'antd';

interface IProps {
  visible: boolean,
  onCancel(): void,
  onOk(modelName: string): void
}

export default memo(({ visible, onCancel, onOk }: IProps) => {

  const [text, setText] = useState('');

  const onChange = useCallback((e) => setText(e.target.value),[]);

  const _onOk = useCallback(() => {
    if(!text) return message.error('model name不能为空');
    onOk(text)
  }, [text, onOk]);

  return (
    <Modal onOk={_onOk} onCancel={onCancel} title='添加Model' visible={visible}>
      <Input placeholder='请输入model name' onChange={onChange} value={text} />
    </Modal>
  )
})