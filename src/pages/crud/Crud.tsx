import React, { useMemo, useState, useCallback } from 'react';
import Qs from 'query-string';
import { CRUD, units } from '@library';
import { IPFS_MODULE } from '@library/app/automatic/package';
import { codingRuleFormItems, workFlowFormItems, auditFormItems } from './data';
import { saveCodingRuleApi, getCodingRuleApi } from './api';

interface QueryProps {
  model?: string;
  isCodingRule?: boolean;
  isWorkFlow?: boolean
}

const BASE_URL = `/bk/ipfs/${IPFS_MODULE}`;

export default () => {

  const query: QueryProps = Qs.parseUrl(window.location.href).query;
  const { columns, formItems } = units.useModel({ modelUrl: `${BASE_URL}/${query.model}/getModel` });
  const [auditFlag, setAuditFlag] = useState(false);

  const onValuesChange = useCallback((changeVlues) => {
    if(Object.keys(changeVlues)[0] === 'auditFlag') setAuditFlag(changeVlues.auditFlag);
  }, []);

  const saveDataBefore = useCallback(async (body) => {
    if(!query.isCodingRule) return body;
    const codingRule = await saveCodingRuleApi(body);
    return { ...codingRule, ...body }
  }, [query.isCodingRule]);

  const getDataAfter = useCallback(async (body) => {
    setAuditFlag(!!body.auditFlag);
    if(!query.isCodingRule) return body;
    const codingRule = await getCodingRuleApi(body);
    return {...codingRule, ...body}
  }, [query.isCodingRule]);

  const showCreateModalBefore = useCallback(() => setAuditFlag(false), []);

  const handleFormItems = useMemo(() => {
    let newFormItems = [...formItems];
    if (query.isCodingRule) newFormItems = [...newFormItems, ...codingRuleFormItems];

    if (query.isWorkFlow) {
      newFormItems = [...newFormItems, ...auditFormItems];
      if (auditFlag) newFormItems = [...newFormItems, ...workFlowFormItems];
    }

    return newFormItems
  }, [formItems, query.isCodingRule, query.isWorkFlow, auditFlag]);

  return (
    <CRUD
      getDataAfter={getDataAfter}
      saveDataBefore={saveDataBefore}
      showCreateModalBefore={showCreateModalBefore}
      onValuesChange={onValuesChange}
      baseUrl={`${BASE_URL}/${query.model}`}
      formItems={handleFormItems}
      columns={columns} />
  )
}