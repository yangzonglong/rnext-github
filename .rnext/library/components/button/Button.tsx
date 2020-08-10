import React, { useCallback, useState, useRef } from 'react'
import { Button as AntdButton } from 'antd'
import { NativeButtonProps } from 'antd/es/button/button'
import { PACKAGE_NAME } from './../../app/automatic/package'
import routePermit from './../../utils/routePermit/routePermit'
import history from './../../app/history'
import DeleteBtn from './DeleteBtn';

const routePermitInPath = routePermit(history.location.pathname, PACKAGE_NAME);
interface IExtendElement {
  Delete: React.FC<NativeButtonProps>;
  Create: React.FC<NativeButtonProps>;
  Submit: React.FC<NativeButtonProps>;
}

const Btn: React.FC<NativeButtonProps> = (props) => {

  const isClick = useRef(false);
  const [loading, setLoading] = useState(false);

  const _onClick = useCallback(async (event) => {
    if (!props.onClick || isClick.current) return;
    isClick.current = true;
    if (props.onClick.constructor.name === 'AsyncFunction') {

      let timeout: any = setTimeout(() => {
        setLoading(true);
        timeout = null;
      }, 200);

      try {
        await props.onClick(event);
      } catch (error) {
        console.log(error)
      }

      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
        isClick.current = false;
      }

      setLoading(false);
    } else {
      props.onClick(event);
      isClick.current = false;
    }
  }, [props])

  return <AntdButton {...props} loading={loading} onClick={_onClick} />
}

const Button: React.FC<NativeButtonProps> & IExtendElement = (props) => {
  return <Btn type='primary' {...props} />
}

Button.Create = (props) => {
  const permit = routePermitInPath.create;
  return permit && <Btn type='primary' {...props}>{props.children || '新建'}</Btn>
}

Button.Delete = (props) => {
  return <DeleteBtn {...props}>{props.children}</DeleteBtn>
}

Button.Submit = (props) => {
  const permit = routePermitInPath.edit;
  return permit && <Btn type='primary' {...props}>{props.children || '提交'}</Btn>
}

export default Button;