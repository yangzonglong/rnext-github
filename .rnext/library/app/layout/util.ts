/*
 * @Author: yangzonglong
 * @Date: 2020-05-18 09:28:07
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-10 09:16:21
 * @Auditor: 
 */
import userInfoProps, { ModuleItemProps, MenuItemProps, MenuGroupItem } from './../../interface/userInfo';

const SESSION_USER_KEY = 'userInfo';

export function findCurrAppMenus(appId: string, t?: Function): MenuGroupItem[] {
  const roleMenu = getUserInfo().menuList || [];
  const appModule = roleMenu.find((item: ModuleItemProps) => item.moduleCode === appId)?.menu || [];
  return appModule.map((group: MenuGroupItem) => {
    return { ...group, children: createAppMenu(group.children, t) }
  });
}

function createAppMenu(children: MenuItemProps[], t?: Function): MenuItemProps[] {
  return children.map((item: MenuItemProps) => {
    const functionUrl = item.functionUrl as string;
    const path = '/' + functionUrl.split('.')[1];
    return { ...item, name: t?.(path) || item.functionName, path }
  })
}

export function setUserInfo(userInfo: userInfoProps) {
  window.sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(userInfo));
}

export function getUserInfo(): userInfoProps {
  const userInfoStr = window.sessionStorage.getItem(SESSION_USER_KEY);
  return userInfoStr ? JSON.parse(userInfoStr) : {};
}

export function clearUserInfo() {
  window.sessionStorage.removeItem(SESSION_USER_KEY)
}

export function createDevMenus(menus: MenuItemProps[], t?: Function): MenuGroupItem[] {
  const developments: MenuItemProps[] = [], demos: MenuItemProps[] = [];
  const filterMenus = menus.filter(item => item.path !== '/crud');

  filterMenus.forEach(item => {
    const path = item.path as string;
    if (t) item.name = t(path);
    if (path.indexOf('demo') >= 0) demos.push(item);
    else developments.push(item);
  })

  return [
    { functionGroup: '', functionGroupDesc: 'Demo', iconb: '\ue6bd', children: demos },
    { functionGroup: '', functionGroupDesc: 'Development', iconb: '\ue733', children: developments }
  ]
}

export function getCurPathInGroupKey(pathname: string, menus: MenuGroupItem[]) {
  let key = 0;
  menus.forEach((group, index: number) => {
    group.children.forEach((menu: MenuItemProps) => {
      if (menu.path === pathname) key = index;
    })
  })
  return String(key)
}
