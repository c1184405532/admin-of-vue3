<template>
  <h1>首页</h1>
  <FormSearch :data="refFormList" @change="formChange" ref="formRef"/>
  <a-button @click="getState">获取数据</a-button>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";

  import FormSearch from "@/components/FormSearch/index.vue";
  import { formList } from "./const";

  const formRef = ref();
  const refFormList = ref(formList);

  const formChange = (value: any, key: string) => {
    // console.log(value);
    console.log("formChange", value, key);
    if (key === "age") {
      formRef.value.setFormState("address", "010")
      refFormList.value[0].defaultValue = "陈"
    }
  }

  onMounted(() => {
    console.log("FormSearchRef", formRef.value.getFormState());
    const payload = formRef.value.getFormState();
    console.log("jons", JSON.stringify(payload));
    
  })

  const getState = () => {
    console.log("FormSearchRef", formRef.value.getFormState().dateRange[0]);
  }
  
  
</script>