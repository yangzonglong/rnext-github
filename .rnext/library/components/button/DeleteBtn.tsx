import React, { memo, useCallback } from 'react';
import preDeletePrompt from './preDeletePrompt';
import Button from './Button';
import { NativeButtonProps } from 'antd/es/button/button';
import { PACKAGE_NAME } from './../../app/automatic/package';
import routePermit from './../../utils/routePermit/routePermit';
import history from './../../app/history';

const DeleteBtn: React.FC<NativeButtonProps> = (props) => {
  const routePermitInPath = routePermit(history.location.pathname, PACKAGE_NAME);
  const permit = routePermitInPath.delete;

  const onClick = useCallback(() => {
    preDeletePrompt(props.onClick)
  }, [props.onClick]);

  return permit ? (
    <Button
      {...props}
      onClick={onClick}
      danger>
      {props.children || '删除'}
    </Button>
  ) : null
}

export default memo(DeleteBtn)