/*
 * @Author: yangzonglong
 * @Date: 2020-05-11 09:26:15
 * @version: v1.0.0
 * @Descripttion: 生成风格文件，用于重置antd样式及为项目提供scss变量
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-08-05 10:42:10
 * @Auditor: 
 */
const package = require('./../../package.json');
const theme = require('./theme.json');
const paths = require('./paths');
const fs = require('fs');

function createTheme() {
  let scssStr = '', jsStr = '';

  for (let i in theme) {
    scssStr += `$${i}: ${theme[i]};`;
    jsStr += `"${i}": "${theme[i]}",`;
  }
  
  jsStr = `export default {${jsStr}}`;

  fs.writeFile(`${paths.appAutomatic}/theme.scss`, scssStr, function (err) {
    if (err) return console.log(err);
    fs.writeFile(`${paths.appAutomatic}/theme.js`, jsStr, function (err) {
      if (err) return console.log(err);
    })
  });
}

module.exports = createTheme;