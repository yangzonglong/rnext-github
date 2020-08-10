/*
 * @Author: yangzonglong
 * @Date: 2020-05-11 10:14:14
 * @version: v1.0.0
 * @Descripttion: 多语言配置文件
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-29 16:44:30
 * @Auditor: 
 */
import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import moment from 'moment';

const PACKAGE_NAME = 'project';
const IS_DEV = process.env.NODE_ENV === 'development';
const LOADPATH = '/locales/{{lng}}/{{ns}}.json';

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'zh-CN',
    ns: ['translation', 'project'],
    debug: false,
    backend: {
      loadPath: IS_DEV ? LOADPATH : `/${PACKAGE_NAME}${LOADPATH}`
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  }).then(() => {
    window.sessionStorage.setItem('_isI18nInit', '1');
    window.i8nInitCallback && window.i8nInitCallback();
    moment.locale(i18n.language);
  });

if (window.sessionStorage.getItem('_isI18nInit')) {
  setTimeout(() => {
    window.i8nInitCallback && window.i8nInitCallback()
  }, 500)
}

export function i18nt(k) {
  return i18n.t(`project:${k}`)
}

export default i18n;