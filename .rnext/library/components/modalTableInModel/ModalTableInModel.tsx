import React, { memo, useCallback, useState, useEffect, useMemo, useRef } from 'react';
import Table from './../table/Table';
import { Input, Modal } from 'antd';
import { ModalTableInModelProps, ModelProps } from './interface';
import { getModelApi } from './api';
import { bodyStyle, searchStyle, defaultModel, DEFAULT_WIDTH, DEFAULT_ROWSELECTIONTYPE } from './data';
import styles from './styles.module.scss';

export default memo(({
  visible,
  onCancel,
  onOk,
  model,
  rowSelectionType,
  syncModel,
  moduleName,
  fieldNames,
  modelName }: ModalTableInModelProps) => {
  
  const tableRef = useRef(null);
  const [curModel, setCurModel] = useState<ModelProps>(defaultModel);
  const [_query, setQuery] = useState({})

  useEffect(() => {
    if (model) {
      syncModel?.(model);
      return setCurModel(model)
    }
    getModelApi(moduleName, modelName).then(model => {
      setCurModel(model);
      syncModel?.({...model, fieldNames: model.fieldNames || fieldNames});
    })
  }, [moduleName, modelName, model, syncModel, fieldNames]);

  const _onOk = useCallback(() => {
    const rows = (tableRef.current as any).getSelectedRows();
    onOk(rows);
  }, [onOk]);

  const onSearch = useCallback((str: string) => {
    if(!str) return setQuery({});
    const or = curModel.searchFields?.reduce((next, cur) => {
      next[cur] = { $regex: str };
      return next
    }, {});
    setQuery({ where: { $or: or } })
  }, [curModel.searchFields]);

  const placeholder = useMemo(() => {
    const join = curModel.searchFields?.map(item => window.$app.t(item)).join('/');
    return window.$app.t('pleaseEnter') + join
  }, [curModel.searchFields]);

  const handleQuery = useMemo(() => {
    return { ..._query, ...curModel.query }
  }, [_query, curModel.query]);
  
  return (
    <Modal
      title={curModel.title}
      bodyStyle={bodyStyle}
      width={DEFAULT_WIDTH}
      onCancel={onCancel}
      onOk={_onOk}
      visible={visible}>
      <div className={styles.search}>
        <Input.Search
          onSearch={onSearch}
          style={searchStyle}
          placeholder={placeholder} />
      </div>
      <Table
        query={handleQuery}
        rowSelectionType={rowSelectionType || DEFAULT_ROWSELECTIONTYPE}
        ref={tableRef}
        columns={curModel.columns}
        url={curModel.url} />
    </Modal>
  )
})