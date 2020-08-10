/*
 * @Author: yangzonglong
 * @Date: 2020-06-24 14:34:10
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-15 17:17:35
 * @Auditor: 
 */
import server from '@library/utils/server/server';
import { IPFS_MODULE } from '@library/app/automatic/package';
import { message } from 'antd';
import { AttributeItemProps, ModelProps } from './interface';

function handleAttributes(attributes: { [n: string]: AttributeItemProps }) {
  const arr = [];
  for (let id in attributes) {
    arr.push({
      ...attributes[id],
      fieldName: id
    })
  }
  return arr
}

export async function getModelApi(modelName: string) {
  try {
    const { attributes, tabs, relations, apiModels, unique } = await server(`/bk/ipfs/${IPFS_MODULE}/${modelName}/getModel`, {});
    return { 
      attributes: handleAttributes(attributes), 
      tabs, 
      relations, 
      apiModels,
      unique
    }
  } catch (error) {
    return { 
      attributes: [], 
      tabs: [], 
      relations: [], 
      apiModels: [],
      unique: []
    }
  }
}

function attributesToObj(model: ModelProps) {
  const attributes = model.attributes || [];

  const obj = attributes.reduce((next: object, cur: AttributeItemProps) => {
    next[cur.fieldName as string] = cur;
    delete cur.fieldName;
    return next;
  }, {});

  if(attributes.length) model.attributes = obj as any;
  return model
}

export async function saveModelApi(modelName: string, newModel: ModelProps) {
  try {
    const model = await server(`/bk/ipfs/${IPFS_MODULE}/${modelName}/getModel`, {});

    const { attributes, tabs, relations, apiModels } = await server(`/bk/ipfs/${IPFS_MODULE}/${modelName}/putModel`, { 
      ...model, 
      ...attributesToObj(newModel) 
    });

    message.success('操作成功');
    return { attributes: handleAttributes(attributes), tabs, relations, apiModels }
  } catch (error) {
    return { attributes: [] }
  }
}

export async function getModelsApi(){
  try {
    const { models } = await server(`/bk/ipfs/${IPFS_MODULE}/getModels`,{});
    return models
  } catch (error) {
    return []
  }
}

export async function registerModelApi(modelName: string){
  try {
    await server(`/bk/ipfs/${IPFS_MODULE}/${modelName}/registerModel`,{ idField: 'id' });
    await server(`/bk/ipfs/${IPFS_MODULE}/${modelName}/putModel`, { attributes: { id: {} } });
    message.success('操作成功');
  } catch (error) {
    return false
  }
}

export async function removeModelApi(modelName: string){
  try {
    await server(`/bk/ipfs/${IPFS_MODULE}/${modelName}/delModel`,{});
    message.success('操作成功');
  } catch (error) {
    return false
  }
}