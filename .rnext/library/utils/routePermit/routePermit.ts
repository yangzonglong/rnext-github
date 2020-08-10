/*
 * @Author: yangzonglong
 * @Date: 2020-04-08 10:56:04
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-13 15:42:01
 * @Auditor: 
 */

let permitMap: any = {};

const defaultRoutePermitInPath = {
  create: true,
  edit: true,
  view: true,
  download: true,
  upload: true,
  delete: true
}

export type CompanyFunctionRoleProps = {
  create: boolean,
  edit: boolean,
  view: boolean,
  download: boolean,
  upload: boolean,
  delete: boolean
}

type ChildItemProps = {
  functionUrl: string,
  CompanyFunctionRole: CompanyFunctionRoleProps
}

type MenuItemProps = {
  functionGroupDesc: string,
  children: ChildItemProps[]
}

type MenuProps = {
  name: string,
  moduleCode: string,
  menu: MenuItemProps[]
}

export default (path: string, appId?: string) => {
  if (!Object.keys(permitMap).length) initRoutePermit(appId as string);
  return permitMap[path] || defaultRoutePermitInPath
}

function initRoutePermit(appId: string) {
  const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo') || '{}');
  const currentAppMenu = filterCurrentAppMenu(userInfo.menuList || [], appId);
  currentAppMenu.forEach(group => {
    group.children.forEach(menu => {
      const companyFunctionRole = menu.CompanyFunctionRole || {};
      const functionUrl = '/' + menu.functionUrl.replace('.', '/');
      permitMap[functionUrl] = companyFunctionRole;
    })
  })
}

function filterCurrentAppMenu(menu: MenuProps[], appId: string) {
  return menu.filter(item => item.moduleCode === appId)[0]?.menu || []
}