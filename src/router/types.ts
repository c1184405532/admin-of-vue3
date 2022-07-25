import { RouteRecordRaw } from "vue-router";

type RouteRecordRawType = RouteRecordRaw & {
  title: string;
  name: string; // 统一使用name进行路由跳转，所以必须定义该字段。好处是在非嵌套路径下跳转嵌套路径无需拼接url如：login -> layout/table/list === login -> tableList(name)
  children?: RouteRecordRawType[]
}

export type {
  RouteRecordRawType
}