import { createBrowserHistory } from 'history';
import { treeRoutesConfig } from './automatic/routes';
import { PACKAGE_NAME } from './automatic/package';
import { matchRoutes } from "react-router-config";
import Qs from 'query-string';
import { History } from 'history';

export type HistoryProps = History & {
  query: {
    [propName: string]: any
  }
}

const _history = createBrowserHistory({
  basename: process.env.NODE_ENV !== 'test' ? PACKAGE_NAME : '/'
}) as HistoryProps;

_history.query = Qs.parseUrl(window.location.href).query;

_history.listen(location => {
  const crumbDatas: any[] = [];
  const routes = matchRoutes(treeRoutesConfig, location.pathname);
  _history.query = Qs.parseUrl(window.location.href).query;
  routes.forEach(item => {
    crumbDatas.push({ name: item.route.name, path: item.route.path });
  })
})

export default _history;