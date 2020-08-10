import React, { memo, useState, useCallback, useMemo } from 'react';
import { Select, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import ModalTableInModel from './../../modalTableInModel/ModalTableInModel';
import { ModalTableInModelProps, ModelProps, FieldNames } from './../../modalTableInModel/interface';
import server from './../../../utils/server/server';
import { setExtra } from './../util';

async function getList(url: string, or: object[]) {
  try {
    const result = await server(url, { where: { $or: or } });
    return result.rows || result
  } catch (error) {
    return []
  }
}

interface IProps extends ModalTableInModelProps {
  id: string,
  onChange(value: string, id: string): void,
  value: string,
  options: object,
  modulName?: string
}

export default memo((props: IProps) => {

  const { id, onChange } = props;
  const [visible, setVisible] = useState(false);
  const [model, setModel] = useState<ModelProps>({} as any);
  const [fieldNames, setFieldNames] = useState<FieldNames>({} as any);

  const onShow = useCallback(() => setVisible(true), []);
  const onHide = useCallback(() => setVisible(false), []);

  const { data, loading, run } = useRequest<any[]>(getList, {
    debounceInterval: 500,
    manual: true
  });

  const onOk = useCallback((rows: object[]) => {
    let values = rows.map(item => item[fieldNames.value]);
    setExtra({ ['_' + id]: rows });
    onChange(values.join(','), id);
    setVisible(false);
  }, [id, onChange, fieldNames]);

  const value = useMemo(() => {
    if (!props.value) return '';
    return props.value.split('?')[0]
  }, [props.value]);

  const onSearch = useCallback(async (value: string) => {
    if(!value) return;
    
    const or = model.searchFields?.reduce((next, cur) => {
      next[cur] = { $regex: value };
      return next
    }, {});

    run(model.url, or)
  }, [model.url, run, model.searchFields]);

  const onSelectChange = useCallback((e) => {
    const rows = data?.filter(item => item[fieldNames.value] === e);
    const values = rows?.map(item => item[fieldNames.value]);
    onChange(`${values?.join(',')}?_${id}=${JSON.stringify(rows)}`, id);
  }, [data, id, fieldNames, onChange]);

  const syncModel = useCallback((model) => {
    setModel(model);
    setFieldNames(model.fieldNames || []);
  }, []);

  return (
    <>
      <Select
        showSearch
        value={value}
        onChange={onSelectChange}
        notFoundContent={loading ? <Spin size='small' /> : null}
        suffixIcon={<SearchOutlined onClick={onShow} />}
        onSearch={onSearch}>
        {data?.map(item => (
          <Select.Option value={item[fieldNames.value]} key={item.id}>
            {item[fieldNames.label]}
          </Select.Option>
        ))}
      </Select>
      <ModalTableInModel
        {...props}
        onOk={onOk}
        syncModel={syncModel}
        onCancel={onHide}
        visible={visible} />
    </>
  )
})