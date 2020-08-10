import React, { useMemo } from 'react'
import { PageHeader as AntdPageHeader, Breadcrumb } from 'antd';
import { PageHeaderProps } from 'antd/lib/page-header';
import { matchRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';
import s from './pageHeader.module.scss';
import history from './../../app/history';
import { treeRoutesConfig } from './../../app/automatic/routes';

const Item = Breadcrumb.Item;

interface IProps extends Partial<PageHeaderProps> { }

const PageHeader = (props: IProps) => {

  const breadcrumbData = useMemo(() => {
    const routes = matchRoutes(treeRoutesConfig, history.location.pathname);
    return routes.map(item => ({ 
      path: item.route.path as string,
      name: window.$app.t(item.route.path as string) 
    }))
  }, []);

  const Title = useMemo(() => {
    if(props.title) return props.title;
    if(breadcrumbData.length === 1) return breadcrumbData[0].name;
    return props.title || (
      <Breadcrumb>
        {breadcrumbData.map(item => (
          <Item key={item.path}>
            <Link to={item.path}>{item.name}</Link>
          </Item>
        ))}
      </Breadcrumb>
    )
  }, [breadcrumbData, props.title]);

  const Extra = useMemo(() => props.extra ? (
    <div className={s.searchBtn}>{props.extra}</div>
  ) : null, [props.extra]);

  return (
    <div className={s.pageHeader}>
      <AntdPageHeader {...props} title={Title} extra={Extra} />
    </div>
  )
}

export default PageHeader
