/*
 * @Author: yangzonglong
 * @Date: 2020-05-18 10:39:51
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-08-05 13:26:54
 * @Auditor: 
 */ 
const proxy = require('http-proxy-middleware');
const package = require('./../package.json');

module.exports = function(app) {
  app.use(
    '/bk',
    proxy({
      target: package.proxy,
      changeOrigin: true
    })
  );
};