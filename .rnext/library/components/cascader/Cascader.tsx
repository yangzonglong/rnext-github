import React, { memo, useState, useEffect, useCallback } from 'react';
import { Cascader } from 'antd';
import { CascaderProps } from './interface';
import { getDataApi } from './api';
import { handleOptions, handleValue } from './util';
import replace from './../../utils/replace/replace';
import { CascaderOptionType } from 'antd/lib/cascader';

export default memo(({ model, id, onChange }: CascaderProps) => {

  const [options, setOptions] = useState<CascaderOptionType[]>([]);

  useEffect(() => {
    getDataApi(model.url).then(data => {
      setOptions(handleOptions(data, model))
    })
  }, [model]);

  const loadData = useCallback(async (selectedOptions) => {

    const targetOption = selectedOptions[selectedOptions.length - 1];
    const curModel = targetOption._model.children;
    const query = replace(targetOption._data,curModel.query);

    targetOption.loading = true;
    const data = await getDataApi(curModel.url, query);
    targetOption.children = handleOptions(data, curModel);
    targetOption.loading = false;
    
    setOptions([...options]);
  }, [options]);

  const _onChange = useCallback((e: (string | number)[]) => {
    if(onChange && id) onChange(e, id);
    console.log(handleValue(e, options))
  }, [id, onChange, options]);

  return (
    <Cascader
      changeOnSelect
      loadData={loadData}
      onChange={_onChange}
      options={options} />
  )
})