import React, { memo, useCallback } from 'react';
import { Layout, Avatar, Dropdown, Menu } from 'antd';
import { getUserInfo, clearUserInfo } from './util';
import Icon from './../../components/icon/Icon';
import s from './layout.module.scss';

const Header = Layout.Header;
const MenuItem = Menu.Item;
const avatarStyle = { background: '#FFF' };

export default memo(() => {

  const userInfo = getUserInfo();

  const logout = useCallback(() => {
    clearUserInfo();
    window.location.reload();
  }, []);

  return (
    <Header className={s.header}>
      <div>
        <Icon className={s.logo} icon='&#xe6ac;'/>
      </div>
      <Dropdown overlay={<Menu>
        <MenuItem onClick={logout}>退出登录</MenuItem>
      </Menu>}>
        <div className={s.user}>
          <div>
            <p>{userInfo.Tenant?.tenantShortName}</p>
            <p>{userInfo.name}</p>
          </div>
          <Avatar src={'/bk/getFile/' + userInfo.image} style={avatarStyle}/>
        </div>
      </Dropdown>
    </Header>
  )
})