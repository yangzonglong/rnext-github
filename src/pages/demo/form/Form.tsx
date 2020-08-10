import React, { useCallback, useRef, useState, useMemo } from 'react';
import { PageHeader, Formx, Button, Tabs } from '@library';
import { FormxRefProps } from '@library/components/formx/interface';
import { baseFormItems, tabs, linkageFormItems } from './data';
import JSONView from 'react-json-viewer';

const scrollView = {
  width: '100%',
  overflow: 'scroll'
}

export default () => {

  const formxRef = useRef<FormxRefProps>(null);
  const [data, setData] = useState({});
  const [tabId,setTabId] = useState(tabs[0].id);

  const getFormData = useCallback(async () => {
    const formData = await formxRef.current?.validateFields();
    console.log(formData);
    setData(formData || {})
  }, []);

  const onChange = useCallback(setTabId, []);

  const FormTabs = useMemo(() => (
    <Tabs onChange={onChange} curTabId={tabId} tabs={tabs}/>
  ), [tabId, onChange]);

  const handleFormItems = useMemo(() => {
    return tabId === '0' ? baseFormItems : linkageFormItems
  }, [tabId]);

  return (
    <>
      <PageHeader title={FormTabs} extra={<Button onClick={getFormData}>获取数据</Button>} />
      <Formx ref={formxRef} formItems={handleFormItems} />
      <div style={scrollView}><JSONView json={data} /></div>
    </>
  )
}