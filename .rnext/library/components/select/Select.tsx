import React, { useCallback, useEffect, useState, memo, useMemo, useRef } from 'react';
import { Select as AntdSelect } from 'antd';
import { SelectProps as AntdSelectProps } from 'antd/lib/select';
import { valueType } from 'antd/lib/statistic/utils';
import { SelectProps } from './interface';
import { getData } from './Api';
import { handleChange, handleValue } from './util'; 

const { Option } = AntdSelect;

const Select: React.FC<SelectProps & AntdSelectProps<valueType>> = (props) => {

  const isInitRef = useRef(false);
  const { url, query, fieldNames, onChange, cacheKey, id, extra } = props;
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);

  const initReq = useCallback(async () => {
    let rows = await getData(url!, query || {}, cacheKey, props.rtnDataAfter);
    let temp: Record<string, any> = {};
    for (let i of rows) temp[i[fieldNames.value]] = i;
    setData(Object.values(temp))
  }, [query, fieldNames, url, cacheKey, props.rtnDataAfter]);

  useEffect(() => {
    if (props.value && url && !isInitRef.current) {
      initReq();
      isInitRef.current = true;
    }
  }, [initReq, url, props.value])

  const dataSource = useMemo(() => props.dataSource || data, [props.dataSource, data]);

  const _onChange = useCallback(value => {
    handleChange({value, id, dataSource, fieldNames, extra, onChange})
  }, [onChange, dataSource, fieldNames, id, extra]);

  const onFocus = useCallback(() => {
    if (data.length || !url) return;
    setLoading(true);
    initReq();
    isInitRef.current = true;
    setLoading(false);
  }, [data, initReq, url]);

  const value = useMemo(() => {
    return handleValue(props.value, props.mode)
  }, [props.value, props.mode]);

  return <AntdSelect
    {...props}
    value={value as any}
    onFocus={onFocus}
    loading={loading}
    onChange={_onChange}>
    {dataSource.map((item) => {
      return <Option key={item.id} value={item[fieldNames.value]}>
        {item[fieldNames.label]}
      </Option>
    })}
  </AntdSelect>
}

export default memo(Select);
