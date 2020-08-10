/*
 * @Author: yangzonglong
 * @Date: 2020-05-11 10:57:27
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-08-05 13:34:02
 * @Auditor: 
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // 提取公共模块
    bundle: [
      "react",
      "react-dom",
      "react-router-dom",
      "ahooks",
      "query-string",
      "axios",
      "i18next",
      "i18next-browser-languagedetector",
      "i18next-xhr-backend",
      "moment",
      "react-i18next",
      "react-json-viewer",
      "react-resizable",
      "xlsx"
    ],
  },
  output: {
    filename: "[name].dll.js",
    path: path.join(__dirname, "../../public/dll"),
    libraryTarget: "var",
    library: "_dll_[name]_[hash]"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "../../public/dll", "[name].manifest.json"),
      name: "_dll_[name]_[hash]"
    })
  ]
};