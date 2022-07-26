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

const setOpenKeys = ({matched, name}: RouteLocationNormalized) => {
  // 1.matched 是匹配的嵌套路由数组，最后一位就是当前匹配的子路由。
  // 2.比对matched最后一位路由name和当前点击路由name，这一步基本上不可能为false，这里只是为了多一层校验。
  // 3.[a, b, c] => openkeys = [b.name]。
  // 4.菜单栏展开的逻辑是，当我们选择某路由时该展开的就是他的父路由。当前路由（子路由）[matched.length - 1]。父路由[matched.length - 2]
  // 5.如果当前菜单是一级页面其实也会匹配成功，比如：layout/home，但是 layout 在定义路由数据时不存在name字段 openKeyName = undefined，此时不会设置。

  const lastMatched = matched[matched.length - 1];
  if (lastMatched.name === name) {
    const openKey = matched[matched.length - 2];
    const openKeyName = <string>openKey?.name;
    if (openKeyName) openKeys.value = [openKeyName];
  }
}

</script>

