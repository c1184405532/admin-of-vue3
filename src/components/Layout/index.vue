<template>
  <a-layout class="admin-layout">
    <SiderBar />

    <a-layout>
      <a-layout-header>
        <HeaderBar/>
      </a-layout-header>

      <a-layout-content>
        <BaseBreadcrumb/>
        <router-view></router-view>
      </a-layout-content>

      <a-layout-footer>creator to chenyuting</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import BaseBreadcrumb from "./BaseBreadcrumb.vue";
import SiderBar from "./SiderBar.vue";
import HeaderBar from "./HeaderBar.vue";

export default defineComponent({
  components: {
    SiderBar,
    HeaderBar,
    BaseBreadcrumb
  },
  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(["1"]),
    };
  },
});

</script>

<style lang="less">
  .admin-layout{
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    .ant-layout-header{
      flex-shrink: 0;
      background: #fff;
      padding: 0;
      box-shadow: 0 0.3px 4px rgb(0 21 41 / 8%);
    }
    .ant-layout-content{
      flex: 1;
      padding: 16px;
      margin: 16px;
      background: #fff;
      border-radius: 6px;
      overflow: auto;
      // min-width: 1600px;
    }
    .ant-layout-footer{
      padding: 12px 0;
      text-align: center;
    }
  }
  .admin-layout section{
    overflow: auto;
  }
</style>
