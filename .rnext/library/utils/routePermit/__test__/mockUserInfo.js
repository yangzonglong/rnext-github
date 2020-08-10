/*
 * @Author: yangzonglong
 * @Date: 2020-04-08 11:02:23
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-04-08 11:11:42
 * @Auditor: 
 */
export default {
  menuList: [
    {
      name: '区块链',
      moduleCode: 'expole',
      menu: [
        {
          functionGroupDesc: '业务中心',
          children: [
            {
              functionUrl: 'expole.demo',
              CompanyFunctionRole: {
                create: true,
                edit: true,
                view: true,
                download: true,
                upload: true,
                delete: false
              }
            }
          ]
        }
      ]
    }
  ]
}