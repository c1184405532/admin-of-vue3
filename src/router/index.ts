import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

import Home from "../pages/home/index.vue";
import Table from "../pages/table/index.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home },
  { path: "/table", component: Table },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;