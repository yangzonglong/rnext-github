import React, { memo } from 'react';
import { Result } from 'antd';

export default memo(() => {
  return (
    <Result 
      status='403'
      title='403'
      subTitle='Sorry, you are not authorized to access this page.'>
    </Result>
  )
})