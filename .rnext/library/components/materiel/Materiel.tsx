import React, { memo, useState, useCallback, useRef } from 'react';
import Table from './../table/Table';
import styles from './materiel.module.scss';
import Search from './../search/Search';
import { Form, Modal } from 'antd';
import { columns, searchData, layout } from './data';
import Select from './../select/Select';
import { MaterielProps } from './interface';
import { TableRefProps } from '../table/interface';

const URL = '/bk/api/material/Material/find';
const HEIGHT = '530px';
const FormItem = Form.Item;

const bodyStyle = {
  height: HEIGHT,
  display: 'flex',
  flexDirection: 'column' as any,
  padding: 0
};

interface IProps {
  visible: boolean;
  onCancel(): void;
  onOk(data: MaterielProps[]): void
}

export default memo(({ visible, onCancel, onOk }: IProps) => {

  const tableRef = useRef<TableRefProps>(null);
  const [form] = Form.useForm();
  const [query, setQuery] = useState({});

  const advancedSearch = useCallback(async () => {
    const values = await form.validateFields();
    setQuery({
      where: Object.keys(values).reduce((next: object, cur: string) => {
        next[cur] = values[cur];
        return next
      }, {})
    });
  }, [form]);

  const advancedReset = useCallback(() => {
    form.resetFields();
    setQuery({});
  }, [form]);

  const onSearch = useCallback((fuzzyValue: string) => {
    setQuery({ fuzzyQuery: true, fuzzyValue, fuzzyField: ['materialCode', 'materialDesc'] })
  }, []);

  const _onOk = useCallback(() => {
    const rows = tableRef.current?.getSelectedRows();
    onOk(rows || [])
  }, [onOk]);

  return (
    <Modal 
      title='选择物料' 
      visible={visible} 
      onCancel={onCancel}
      onOk={_onOk}
      bodyStyle={bodyStyle} 
      centered 
      width={900}>
      <div className={styles.search}>
        <Search
          advancedSearch={advancedSearch}
          advancedReset={advancedReset}
          enterButton
          onSearch={onSearch}
          placeholder='请输入物料编码/物料描述' suffix={
            <Form form={form} {...layout}>
              {searchData.map(item => (
                <FormItem
                  name={item.fieldNames.value}
                  label={item.label}
                  key={item.fieldNames.value}>
                  <Select {...item} />
                </FormItem>
              ))}
            </Form>
          } />
      </div>
      <Table
        ref={tableRef}
        rowSelectionType='checkbox'
        columns={columns}
        url={URL}
        query={query} />
    </Modal>
  )
})