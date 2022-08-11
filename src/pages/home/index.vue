<template>
  <h1>首页</h1>
  <a-button>自定义主色后的按钮，鼠标移入查看效果</a-button>
  <FormSearch :data="formList" @change="formChange"/>
</template>

<script lang="ts" setup>
  import FormSearch from "@/components/FormSearch/index.vue";
  import { formList } from "./const";
  
  const formChange = (value: any, key: string) => {
    console.log(value);
    console.log("key", key);
  }
</script>