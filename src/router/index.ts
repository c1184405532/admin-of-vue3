import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { RouteRecordRawType } from "./types";

import Login from "../pages/login/index.vue";
import Home from "../pages/home/index.vue";
import Table from "../pages/table/index.vue";



const baseRoutes = [
  { path: "/", redirect: "/home" },
  { path: "/login", component: Login},
]

const layoutRoutes: RouteRecordRawType[] = [
  { title: "首页", path: "/home", component: Home},
  { title: "表格页", path: "/table", component: Table },
]

const router = createRouter({
  history: createWebHistory(),
  routes: [...baseRoutes, ...layoutRoutes],
})

export default router;

export {
  layoutRoutes
}