<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo" />
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      @click="handClick"
      theme="dark"
      mode="inline"
    >
      <SubMenuTree :list="siderBarList"/>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>

import { onMounted, ref } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate, RouteLocationNormalized } from "vue-router";
import { layoutRoutes } from "@/router";
import { MenuItemCallBack } from "./types";

import SubMenuTree from "./SubMenuTree.vue";

const siderBarList = ref(layoutRoutes);
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);


const route = useRoute();
const router = useRouter();

onMounted(() => {
  const routeName: string = <string>route.name;
  setSelectKeys(routeName);
  setOpenKeys(<RouteLocationNormalized>route);
})

onBeforeRouteUpdate(to => {
  // 监听路由变化，同步设置需要选中的key，或展开的key（一般在点击浏览器前进后退按钮时触发）。

  setSelectKeys(<string>to.name);
  setOpenKeys(<RouteLocationNormalized>to);
})

const handClick = (e: MenuItemCallBack) => {
  router.push({ name: e.key });
}

const setSelectKeys = (routeName: string) => {
  // 1.获取当前选中key，判断是否和当前路由的name匹配，如果不匹配重新设置

  const [key] = selectedKeys.value;
  if (key !== routeName) selectedKeys.value = [routeName];
}

const setOpenKeys = ({matched}: RouteLocationNormalized) => {
  // 1.matched 是匹配的嵌套路由数组，最后一位就是当前匹配的子路由。
  // 2.截取除最后一位的值，遍历name，设置keys即可（a-sub-menu的key就是路由信息的name字段）

  const hasMatched = matched.slice(0, matched.length - 1);
  const matchKeys: string[] = [];
  hasMatched.forEach(match => {
    if (match.name) matchKeys.push(<string>match.name);
  })
  openKeys.value = matchKeys;
}

</script>

