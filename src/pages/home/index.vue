<template>
  <h1>首页</h1>
  <a-button>自定义主色后的按钮，鼠标移入查看效果</a-button>
  <FormSearch :data="formList" @on-change="formChange"/>
</template>

<script lang="ts" setup>
  import FormSearch from "@/components/FormSearch/index.vue";
  import { formList } from "./const";
  
  const formChange = (item, key) => {
    console.log(item.value);
    console.log("key", key);
  }
</script>