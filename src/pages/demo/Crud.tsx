import React from 'react';
import { CRUD } from '@library';

const columns = [
  { dataIndex: 'inventoryTypeCode' },
  { dataIndex: 'inventoryTypeDesc' }
]

const formItems = [
  { name: 'inventoryTypeCode', required: true },
  { name: 'inventoryTypeDesc', required: true }
]

const urls = {
  findUrl: '/bk/api/warehouse/InventoryType/find',
  removeUrl: '/bk/api/warehouse/InventoryType/delete',
  updateUrl: '/bk/api/warehouse/InventoryType/update',
  addUrl: '/bk/api/warehouse/InventoryType/add'
}

export default () => {
  return (
    <CRUD columns={columns} formItems={formItems} urls={urls}/>
  )
}