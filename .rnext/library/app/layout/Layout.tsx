import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Sider from './Sider';
import Login from './Login';
import Header from './Header';
import styles from './layout.module.scss';
import { findCurrAppMenus, createDevMenus } from './util';
import { MenuGroupItem } from './../../interface/userInfo';
import { treeRoutesConfig } from './../automatic/routes';
import { PACKAGE_NAME } from './../automatic/package';

const IS_DEV = process.env.NODE_ENV === 'development';

const { Content } = Layout;

const AppLayout: React.FC = ({ children }) => {

  const [menus, setMenus] = useState<MenuGroupItem[]>([]);

  useEffect(() => {
    window.i8nInitCallback = () => {
      const t = window.$app.t;
      setMenus(IS_DEV ? createDevMenus(treeRoutesConfig, t) : findCurrAppMenus(PACKAGE_NAME, t))
    }
    setMenus(IS_DEV ? createDevMenus(treeRoutesConfig) : findCurrAppMenus(PACKAGE_NAME))
  }, []);

  return (
    <Layout className={styles.layout}>
      <Header />
      <Layout>
        <Sider menus={menus} />
        <Content className={styles.content}>
          {children}
        </Content>
      </Layout>
      <Login />
    </Layout>
  )
}

export default AppLayout;