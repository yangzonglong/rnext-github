import React, { memo, useCallback } from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

type TabItem = {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  curTabId: string;
  onChange(id: string): void
}

export default memo(({ tabs, curTabId, onChange }: TabsProps) => {

  const _onChange = useCallback((e: any) => {
    onChange(e.target.value)
  }, [onChange]);

  return (
    <RadioGroup onChange={_onChange} value={curTabId}>
      {tabs.map(item => (
        <RadioButton value={item.id} key={item.id}>
          {item.label}
        </RadioButton>
      ))}
    </RadioGroup>
  )
})