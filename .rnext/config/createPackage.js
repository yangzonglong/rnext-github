/*
 * @Author: yangzonglong
 * @Date: 2020-05-11 09:52:53
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-08-05 10:41:55
 * @Auditor: 
 */
const package = require('./../../package.json');
const paths = require('./paths');
const fs = require('fs');

function createPackage() {
  const obj = { 
    PACKAGE_NAME: package.name,
    IPFS_MODULE: package.ipfsModule
  };

  const packageStr = Object.keys(obj).reduce((next, cur) => {
    next += `export const ${cur} = "${obj[cur]}";`;
    return next;
  }, '');

  fs.writeFile(`${paths.appAutomatic}/package.js`, packageStr, function (err) {
    if (err) return console.log(err);
  });

}

module.exports = createPackage;