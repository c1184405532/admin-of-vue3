<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo" />
    <a-menu
      v-model:selectedKeys="selectedKeys"
      @click="handClick"
      theme="dark"
      mode="inline"
    >
      <SubMenuTree :list="siderBarList"/>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">

import { defineComponent, ref } from "vue";
import { layoutRoutes } from "@/router";
import { MenuItemCallBack } from "./types";
import SubMenuTree from "./SubMenuTree.vue";

export default defineComponent({
  components: {
    SubMenuTree
  },
  data() {
    return {
      siderBarList: layoutRoutes,
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(["1"]),
    };
  },
  methods: {
    handClick(e: MenuItemCallBack) {
      this.$router.push({ name: e.key })
      console.log(e);
    },
  },
});
</script>

