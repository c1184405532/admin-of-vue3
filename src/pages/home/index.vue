<template>
  <h1>首页</h1>
  <FormSearch :data="formList" :loading="loading" @change="formChange" @search="onSearch" ref="formRef"/>
  <a-button @click="getState">获取数据</a-button>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";

  import FormSearch from "@/components/FormSearch/index.vue";
  import { formList } from "./const";

  const formRef = ref();

  const loading = ref(false);

  const formChange = (value: any, key: string) => {
    // console.log(value);
    console.log("formChange", value, key);
    if (key === "age") {
      formRef.value.setFormState({"address": "new-beij", userName: "陈禹廷", textarea: "描述新"})
      
    }
  }

  onMounted(() => {
    console.log("FormSearchRef", formRef.value.getFormState());
    const payload = formRef.value.getFormState();
    console.log("jons", JSON.stringify(payload));
    loading.value = true;

    setTimeout(() => {
      formList[3].options = [
        { label: "new-成都", value: "new-028" },
        { label: "new-beij", value: "new-beij" },
        { label: "new-henan", value: "new-heinan" },
      ]
      loading.value = false;
    }, 1500)
    
  })

  const onSearch = (formState: any) => {
    console.log("formState", formState.dateRange[0]);
    
  }

  const getState = () => {
    console.log("FormSearchRef", formRef.value.getFormState());
  }
  
  
</script>