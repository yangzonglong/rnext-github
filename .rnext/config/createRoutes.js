/*
 * @Author: yangzonglong
 * @Date: 2020-05-06 17:12:40
 * @version: v1.0.0
 * @Descripttion: 自动生成路由配置信息
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-06-29 17:10:29
 * @Auditor: 
 */
var fs = require('fs');
var path = require('path');
var paths = require('./paths');

function createRoutes() {

  var routesConfig = [], treeRoutesConfig = [];

  function getPageFile(src, parentPath) {
    var context = fs.readdirSync(src);

    context.forEach(function (item, index) {
      var currentPath = path.join(src, item);
      var stat = fs.statSync(currentPath);

      if (stat.isDirectory()) {
        getPageFile(currentPath, pathFirstwordToLowerCase(getPagePath(currentPath)))
      }

      if (stat.isFile()) {
        if (path.extname(currentPath) === '.tsx' && currentPath.indexOf('_') < 0) {
          const pagePath = getPagePath(currentPath);
          const path = pathFirstwordToLowerCase(pagePath);
          routesConfig.push({
            path,
            parentPath,
            componentPath: pagePath
          })
        }
      }
    })

    surplus(routesConfig);

  }

  getPageFile(paths.appPages);
}

function getPagePath(pathStr, basePageName) {
  const sep = pathStr.split(path.sep).join('/');
  return sep.replace('.tsx', '').split('src/pages')[1]
}

function pathFirstwordToLowerCase(pathStr) {
  var arr = pathStr.split('/').filter(item => item);
  return '/' + arr.map(item => item.replace(item[0], item[0].toLowerCase())).join('/')
}

// 去除path parentPath重复的路径文字符串
function surplus(routesConfig) {
  routesConfig = routesConfig.map(function (item) {

    let path = Array.from(new Set(item.path.split('/'))).join('/');
    let parentPath = Array.from(new Set(item.parentPath.split('/'))).join('/');

    if(path === parentPath) {
      const arr = parentPath.split('/');
      parentPath = '/' + arr.splice(1, arr.length - 2).join('/');
    }

    return { 
      ...item, 
      path, 
      parentPath
    }
  })
  toTree(routesConfig);
}

// 扁平化路由转tree，用于react-route-config matchRoutes 方法 匹配路由
function toTree(routesConfig) {
				
  const treeRoutesConfig = [];
  const temp = routesConfig.reduce((next, cur) => (next[cur.path] = {...cur}) && next, {});

  routesConfig.forEach(item => {
    const tempItem = temp[item.path];

    if (tempItem.path !== tempItem.parentPath && temp[tempItem.parentPath]) { // 子路由
      if(!temp[tempItem.parentPath]) return;
      if(!temp[tempItem.parentPath].routes) temp[tempItem.parentPath].routes = [];
      return temp[tempItem.parentPath].routes.push(tempItem)
    }
    
    treeRoutesConfig.push(tempItem)
  })
  outputRoutes(routesConfig.sort(sort), treeRoutesConfig)
}

function sort(a, b){
  return b.path.split('/').length - a.path.split('/').length
}

function outputRoutes(routesConfig, treeRoutesConfig) {
  
  const routesConfigStr = `export default ${JSON.stringify(routesConfig)};`;
  const treeRoutesConfigStr = `export const treeRoutesConfig = ${JSON.stringify(treeRoutesConfig)};`;

  fs.writeFileSync(`${paths.appAutomatic}/routes.js`, routesConfigStr + treeRoutesConfigStr);
}

module.exports = createRoutes;
