import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import type { RouteRecordRaw } from "vue-router";

import Layout from "@/components/Layout/index.vue";
import RenderRouterView from "@/components/RenderRouterView/index.vue";

import Login from "../pages/login/index.vue";
import Home from "../pages/home/index.vue";
import Table from "../pages/table/index.vue";

import ListOne from "@/pages/nested/listOne/index.vue";
import ListTwo from "@/pages/nested/listTwo/index.vue";

const layoutRoutes: RouteRecordRaw[] = [
  { meta: { title: "首页" }, path: "home", name: "home", component: Home },
  { meta: { title: "表格示例" }, path: "table", name: "table", component: Table },
  {
    meta: { title: "嵌套列表" },
    path: "nested",
    name: "nested",
    component: RenderRouterView,
    children: [
      {
        meta: { title: "列表1" },
        path: "ListOne",
        name: "nestedListOne",
        component: ListOne,
      },
      {
        meta: { title: "多级嵌套列表" },
        path: "ListTwo",
        name: "nestedListTwo",
        component: RenderRouterView,
        children: [
          {
            meta: { title: "列表2" },
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
