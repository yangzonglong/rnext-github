/*
 * @Author: yangzonglong
 * @Date: 2020-07-10 13:13:29
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-14 14:54:38
 * @Auditor: 
 */
import { units } from '@library';
import { IPFS_MODULE } from '@library/app/automatic/package';

const BASE_URL = `/bk/ipfs/${IPFS_MODULE}`;
const CODING_RULES_URL = IPFS_MODULE.charAt(0).toUpperCase() + IPFS_MODULE.slice(1) + 'CodingRule';

export async function saveCodingRuleApi(data: any) {
  try {
    const _data = { ...data };
    _data.id = data[CODING_RULES_URL + 'Id'];
    _data[`${IPFS_MODULE}RuleCode`] = data[`${IPFS_MODULE}TypeCode`];

    const result = await units.server(`${BASE_URL}/${CODING_RULES_URL}/put`, { data: _data });
    result[CODING_RULES_URL + 'Id'] = result.id;
    delete result.id;
    return result
  } catch (error) {
    return {}
  }
}

export async function getCodingRuleApi(data: any) {
  try {

    const codingRuleId = data[CODING_RULES_URL + 'Id'];
    if(!codingRuleId) return {};

    const result = await units.server(`${BASE_URL}/${CODING_RULES_URL}/query`, {
      where: { id: codingRuleId }
    });

    return result ? result[0] : {}
  } catch (error) {
    return {}
  }
}