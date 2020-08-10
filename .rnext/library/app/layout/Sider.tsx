import React, { memo, useCallback, useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { MenuGroupItem } from './../../interface/userInfo';
import { MenuInfo, SelectInfo } from 'rc-menu/lib/interface';
import history from './../history';
import Icon from './../../components/icon/Icon';
import s from './layout.module.scss';
import classnames from 'classnames';
import Qs from 'query-string';
import { getCurPathInGroupKey } from './util';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;
interface IProps {
  menus: MenuGroupItem[]
}

const AppSider = ({ menus }: IProps) => {

  const [collapsed, setCollapsed] = useState(false);
  const onClick = useCallback((data: MenuInfo) => history.push(data.key as string), []);
  const collapsedFn = useCallback(() => setCollapsed(!collapsed), [collapsed]);

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const onOpenChange = useCallback((keys) => {
    setOpenKeys(keys)
  }, []);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const onSelect = useCallback(({ key }: SelectInfo) => setSelectedKeys([key as string]), []);

  useEffect(() => {
    const query = Qs.parseUrl(window.location.href).query;
    const pathname = query.fc ? '/' + query.fc : history.location.pathname;
    setSelectedKeys([pathname]);
    setOpenKeys([getCurPathInGroupKey(pathname, menus)]);
  }, [menus]);

  const createTitle = useCallback((group: MenuGroupItem) => (
    <p className={s.group}>
      <Icon className={s.groupIcon} icon={group.iconb as string} />
      <span className={s.groupDesc}>{group.functionGroupDesc}</span>
    </p>
  ), []);

  return (
    <div className={classnames(s.sider,{
      [s.siderCollapsed]: collapsed
    })}>
      <Sider theme='light'>
        {!collapsed && <h1 className={s.appName}>{window.$app.t('appName')}</h1>}
        {!collapsed && (
          <Menu 
            openKeys={openKeys} 
            onOpenChange={onOpenChange}
            selectedKeys={selectedKeys} 
            onSelect={onSelect}
            onClick={onClick} 
            mode='inline'>
            {menus.map((item, index) => (
              <SubMenu title={createTitle(item)} key={index}>
                {item.children.map(menu => (
                  <Item key={menu.path}>
                    {menu.name || menu.path}
                  </Item>
                ))}
              </SubMenu>
            ))}
          </Menu>
        )}
      </Sider>
      <Icon
        onClick={collapsedFn}
        className={classnames(s.shrink, {
          [s.shrinkCollapsed]: collapsed
        })}
        icon='&#xe614;'
        theme='success' />
    </div>
  )
}

export default memo(AppSider);