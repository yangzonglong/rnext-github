import React, { memo, useState, useCallback, useEffect, useMemo } from 'react';
import { Modal } from 'antd';
import { IPFS_MODULE } from '@library/app/automatic/package';
import useModel from '@library/utils/use/useModel/useModel';
import { Tabs, Formx } from '@library';

interface IProps {
  modelName: string
}

export default memo(({ modelName }: IProps) => {

  const modelUrl = `/bk/ipfs/${IPFS_MODULE}/${modelName}/getModel`;

  const [curTabId, setCurTabId] = useState('');
  const { tabs, tabsFormItems } = useModel({ modelUrl });

  const onChange = useCallback(setCurTabId, []);

  useEffect(() => {
    if (tabs.length) setCurTabId(tabs[0].id);
  }, [tabs]);

  const formItems = useMemo(() => {
    if(!curTabId) return [];
    return tabsFormItems[curTabId].formItems
  }, [tabsFormItems, curTabId]);

  return (
    <Modal title='预览分组Form' visible={false}>
      <Tabs onChange={onChange} curTabId={curTabId} tabs={tabs} />
      <Formx formItems={formItems} />
    </Modal>
  )
})