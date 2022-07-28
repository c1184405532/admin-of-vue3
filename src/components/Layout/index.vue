<template>
  <a-layout style="min-height: 100vh">
    <SiderBar />

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" >
        <HeaderBar/>
      </a-layout-header>

      <a-layout-content style="margin: 0 16px">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">

import { defineComponent, ref } from "vue";
import SiderBar from "./SiderBar.vue";
import HeaderBar from "./HeaderBar.vue";
export default defineComponent({
  components: {
    SiderBar,
    HeaderBar
  },
  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(["1"]),
    };
  },
});

</script>

