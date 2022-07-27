import { DefineComponent } from "vue";

type RouteRecordRawType = {
  title: string; // 菜单栏标题
  path: string; // 浏览器地址显示路径
  component: DefineComponent<object, object, any>;
  children?: RouteRecordRawType[];

  // 统一使用name进行路由跳转，所以必须定义该字段。好处是在非嵌套路径下跳转嵌套路径无需拼接url如：login -> layout/table/list === login -> tableList(name)
  // 嵌套路由的父组件也需要该字段，这是设置a-sub-menu的key字段，用于openkeys。
  name: string;
};

export type { RouteRecordRawType };
