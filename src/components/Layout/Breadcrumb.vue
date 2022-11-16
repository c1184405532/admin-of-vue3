<template>
  <a-breadcrumb>
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
    <a-breadcrumb-item>An Application</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
  import { useRouter, onBeforeRouteLeave } from "vue-router";

  const router = useRouter();
  console.log("router", router);
  router.beforeEach((to, form) => {
    console.log("beforeEach", to, form);
    return true;
  })

  onBeforeRouteLeave((to, form) => {
    console.log("onBeforeRouteLeave", to, form);
    
    return false;
  })

</script>
  
<style lang="less" scoped>

</style>
