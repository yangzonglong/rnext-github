import _routesConfig from './automatic/routes';
import { lazy } from 'react';

export const routesConfig = _routesConfig;

export default _routesConfig.map(item => {
  return {
    path: item.path,
    component: lazy(() => import('./../../../src/pages' + item.componentPath)),
    exact: true
  }
})