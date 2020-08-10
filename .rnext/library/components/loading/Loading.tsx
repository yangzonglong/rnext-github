/*
 * @Author: yangzonglong
 * @Date: 2020-05-11 11:24:32
 * @version: v1.0.0
 * @Descripttion: 通用Loading组件
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-05-14 11:31:47
 * @Auditor: 
 */
import React, { memo } from 'react';
import { Spin } from 'antd';
import styles from './loading.module.scss';

interface IProps { visible: boolean }

const Loading = ({ visible }: IProps) => {
  return visible ? (
    <div>
      <div className={styles.mask} />
      <div className={styles.loading}>
        <Spin size='large' />
      </div>
    </div>
  ) : null
}

export default memo(Loading);