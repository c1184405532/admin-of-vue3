<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="v in routerMatchedTitles" :key="v">{{ v }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { useRoute, useRouter } from "vue-router";

  const route = useRoute();
  const router = useRouter();
  const routerMatchedTitles = ref<Array<any>>([]);

  router.beforeEach((to) => {
    setMatchedTitles(to.matched)
    return true;
  })

  setMatchedTitles(route.matched); // 初始化设置 created

  function setMatchedTitles(matcheds: any) {
    routerMatchedTitles.value = []; // 重置
    matcheds.forEach((matched: any) => { 
      if (matched?.meta?.title) routerMatchedTitles.value.push(matched.meta.title);
    })
  }
</script>
  
<style lang="less" scoped>

</style>
