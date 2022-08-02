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
  { path: "/login", name: "login", component: Login },
  { path: "/layout", component: Layout, children: layoutRoutes },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...baseRoutes],
});

// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
router.beforeEach(async (to) => {
  const token = localStorage.getItem("USER_TOKEN");
  // 关于接口请求返回登陆过期问题，使用 router.push({ name: "login", query: { redirect: current.path }})
  if (!token && to.name !== "login") return { name: "login", query: { redirect: to.path } }
})

export default router;

export { layoutRoutes };
