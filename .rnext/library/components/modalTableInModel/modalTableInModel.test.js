/*
 * @Author: yangzonglong
 * @Date: 2020-07-06 14:18:12
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-06 14:21:41
 * @Auditor: 
 */ 
import React from 'react';
import { render } from '@testing-library/react';
import ModalTableInModel from './ModalTableInModel';

const MOCK_MODULE = 'module';
const MOCK_MODEL = 'model';

test('URL方式测试', () => {
  const { rerender } = render(<ModalTableInModel moduleName={MOCK_MODULE} modelName={MOCK_MODEL}/>);
})