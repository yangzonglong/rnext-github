import React, { memo, useMemo } from 'react';
import styles from './icon.module.scss';
import classnames from 'classnames';
import iconMap from './iconMap';

interface IProps {
  icon: string,
  theme?: 'warning' | 'success',
  onClick?: () => void,
  className?: string
}

export default memo(({ icon, onClick, className, theme }: IProps) => {

  const handleIcon = useMemo(() => iconMap[icon] || icon, [icon]);

  return (
    <span className={classnames(styles.icon, {
      [className || '']: !!className,
      [styles.success]: theme && theme === 'success',
      [styles.warning]: theme && theme === 'warning',
      [styles.cursor]: !!onClick
    })} onClick={onClick}>{handleIcon}</span>
  )
})