import React, { memo } from 'react';
import styles from './icon.module.scss';

interface IProps {
  children: React.ReactNode
}

const IconGroup = ({ children }: IProps) => {
  return (
    <p className={styles.iconGroup}>{children}</p>
  )
}

export default memo(IconGroup);