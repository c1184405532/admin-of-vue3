<template>
  <h1>首页</h1>
  <FormSearch :data="formList" :loading="loading" @change="formChange" @search="onSearch" ref="formRef"/>
  <a-button @click="getState">获取数据</a-button>
  <BaseTable
    @click="tableClick"
    :columns="tableColumns"
    :query="tableQueryParams"
    :header-btns="tableHeaderBtns"
    :row-selection="{ selectedRowKeys: refSelectedRowKeys, onChange: onSelectChange }"
    requestUrl="repairOrder/queryPage"
    ref="tableRef"
  >
    <template #address="{ record, column }">
      <span > 动态slot record:{{ record.salesName }} column: {{ column.id }}</span>
    </template>
    <template #address2="{ record, column }">
      <span > address1 record:{{ record.salesName }} column: {{ column.key }}</span>
    </template>
  </BaseTable>
</template>

<script lang="ts" setup>
  import { ref, onMounted, reactive } from "vue";

  import type { TableRef } from "@/components/BaseTable";

  import FormSearch from "@/components/FormSearch/index.vue";
  import BaseTable from "@components/BaseTable/index.vue";
  import { formList, columns, tableHeaderBtns } from "./const";
  
  type Key = string | number;

  const formRef = ref();
  const tableRef = ref<TableRef>();
  const loading = ref(false);
  const tableColumns = reactive(columns);
  const tableQueryParams = ref({});
  const refSelectedRowKeys = ref<Key[]>([])

  const formChange = (value: any, key: string) => {
    console.log("formChange", value, key);
    if (key === "age") {
      formRef.value.setFormState({"address": "new-beij", userName: "陈禹廷", textarea: "描述新"})
    }
  }

  const onSelectChange = (selectedRowKeys: Key[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    refSelectedRowKeys.value = selectedRowKeys
  };

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

  const onSearch = async (formState: any) => {
    // console.log("formState", formState);
    tableQueryParams.value = formState;
  }

  const tableClick = (type: string, data: any) => {
    console.log("type", type)
    console.log("tableClick data", data)
  }

  const getState = () => {
    tableColumns[2] = {
      title: "Full Name",
      width: 100,
      // dataIndex: 'name',
      key: "name",
    };
    console.log("FormSearchRef", formRef.value.getFormState());
  }
  
  
</script>