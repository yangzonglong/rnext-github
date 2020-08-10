import React from 'react';
import { IPFS_MODULE } from '@library/app/automatic/package';
import { PageHeader, Cascader } from '@library';

const model = {
  url: `/bk/ipfs/${IPFS_MODULE}/testPlant/query`,
  fieldNames: {
    label: 'plantName',
    value: 'plantCode'
  },
  children: {
    url: `/bk/ipfs/${IPFS_MODULE}/testLocation/query`,
    fieldNames: {
      label: 'locationName',
      value: 'locationCode'
    },
    query: { 
      where: {
         plantCode: "{{plantCode}}"
      } 
    }
  }
}

export default () => {
  return (
    <>
      <PageHeader/>
      <Cascader model={model}/>
    </>
  )
}