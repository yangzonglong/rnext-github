/*
 * @Author: yangzonglong
 * @Date: 2020-07-02 09:08:58
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-02 13:27:28
 * @Auditor: 
 */
import server from './../../utils/server/server';
import i18n from './../../app/i18n';
import { ApiModelProps } from './interface';

const TYPE = 'modalTableInModel';

export async function getModelApi(module: string, model: string) {
  try {
    const url = `/bk/ipfs/${module}/${model}/getModel`;
    const { apiModels = [], attributes } = await server(url, {});
    const curApiModel: ApiModelProps = apiModels.find((item: ApiModelProps) => item.type === TYPE);

    const columns = [];
    const searchFields = [];

    for(let field in attributes) {
      if(curApiModel.columns.includes(field)) {

        if(attributes[field].filter) {
          searchFields.push(field)
        }

        columns.push({
          dataIndex: field,
          order: attributes[field].order,
          sorter: attributes[field].sort
        })
      }
    }

    const locales = curApiModel.locales;

    return { 
      columns, 
      searchFields, 
      title: locales[i18n.language === 'zh-CN' ? 'cn' : 'en'] as string,
      url: `/bk/ipfs/${module}/${model}/query`,
      fieldNames: curApiModel.fieldNames
    }

  } catch (error) {
    return { 
      columns: [], 
      searchFields: [], 
      fieldNames: {
        value: '',
        label: ''
      },
      title: '',
      url: ''
    }
  }
}