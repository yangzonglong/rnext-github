/*
* @Author: yangzonglong
* @Date: 2020-05-19 11:29:53
* @version: v1.0.0
* @Descripttion: 
* @LastEditors: yangzonglong
* @LastEditTime: 2020-05-22 09:41:55
* @Auditor: 
*/

type TenantProps = {
  id: string,
  logoFile: string | null,
  tenantCode: string,
  tenantName: string,
  tenantShortName: string | null,
  tenantStatus: string,
  validityDateFrom: string,
  validityDateTo: string | null
}

export type MenuItemProps = Partial<{
  id: string,
  functionCode: string,
  functionName: string,
  functionDesc: string,
  functionGroup: string,
  functionGroupDesc: string,
  functionOrder: number,
  functionStatus: string,
  functionType: string,
  functionUrl: string,
  serviceFunctionId: string,
  serviceModuleCode: string,
  serviceModuleId: string,
  serviceModuleName: string,
  path: string,
  name: string
}>

export type MenuGroupItem = {
  icona?: string,
  iconb?: string,
  functionGroup: string,
  functionGroupDesc: string,
  children: MenuItemProps[]
}

export type ModuleItemProps = {
  name: string,
  moduleCode: string,
  moduleOrderNumber: number,
  menu: MenuGroupItem[]
}

export default interface UserInfoProps {
  id: string,
  Tenant: TenantProps,
  tenant: string,
  deptCode: string | null,
  deptName: string | null,
  deviceRegId: string | null,
  email: string,
  employeeId: string,
  employeeName: string,
  firstTimeLogin: number,
  identificationCard: string | null,
  image: string | null,
  jobNumber: string | null,
  language: string | null,
  mobile: string,
  name: string,
  nickName: string | null,
  position: string | null,
  reportTo: string | null,
  resetPasswordExpires: string | null,
  resetPasswordToken: string | null,
  userType: string,
  wxOpenId: string | null,
  menuList: ModuleItemProps[]
}