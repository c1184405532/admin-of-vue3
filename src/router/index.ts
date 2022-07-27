import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { RouteRecordRawType } from "./types";

import Layout from "@/components/Layout/index.vue";
import RenderRouterView from "@/components/RenderRouterView/index.vue";

import Login from "../pages/login/index.vue";
import Home from "../pages/home/index.vue";
import Table from "../pages/table/index.vue";

import ListOne from "@/pages/nested/listOne/index.vue";
import ListTwo from "@/pages/nested/listTwo/index.vue";

const layoutRoutes: RouteRecordRawType[] = [
  { title: "首页", path: "home", name: "home", component: Home },
  { title: "表格页", path: "table", name: "table", component: Table },
  {
    title: "嵌套列表",
    path: "nested",
    name: "nested",
    component: RenderRouterView,
    children: [
      {
        title: "列表1",
        path: "ListOne",
        name: "nestedListOne",
        component: ListOne,
      },
      {
        title: "多级嵌套列表",
        path: "ListTwo",
        name: "nestedListTwo",
        component: RenderRouterView,
        children: [
          {
            title: "列表2",
            path: "subTwopath",
            name: "subTwo",
            component: ListTwo,
          },
        ]
      },
    ],
  },
];

const baseRoutes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/layout", component: Layout, children: layoutRoutes },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...baseRoutes],
});

export default router;

export { layoutRoutes };
