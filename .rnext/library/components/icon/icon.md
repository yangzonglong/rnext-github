# Icon
> 通用Icon组件

[iconfont icon 点我跳转](https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.11&manage_type=myprojects&projectId=1378845&keyword=&project_type=&page=)

| 属性 | 说明 | 类型 | 默认值 | 必填 |
| :--- | :--- | --- | --- | --- |
| icon | icon编码 | string |  | *
| theme | 主题 | warning or success |
| onClick | 点击事件 | Function |
| clssName | 附加样式名 | string |

#### 示例
```js
import React from 'react';
import Icon from '@library/components/icon/Icon';

export default () => {
  return <Icon icon='&#xe6c7;'/>
}
```