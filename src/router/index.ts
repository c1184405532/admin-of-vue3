import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { RouteRecordRawType } from "./types";

import Layout from "@/components/Layout/index.vue";

import Login from "../pages/login/index.vue";
import Home from "../pages/home/index.vue";
import Table from "../pages/table/index.vue";

const layoutRoutes: RouteRecordRawType[] = [
  { title: "首页", path: "home", name: "home", component: Home},
  { title: "表格页", path: "table", name: "table", component: Table },
]

const baseRoutes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/layout", component: Layout, children: layoutRoutes }
]


const router = createRouter({
  history: createWebHistory(),
  routes: [...baseRoutes]
})


export default router;

export {
  layoutRoutes
}