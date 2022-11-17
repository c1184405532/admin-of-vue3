<template>
  <BaseForm :data="formList" :loading="loading" @change="formChange" ref="baseFormRef"/>
  <FormSearch
    @change="formChange"
    @search="onSearch"
    :data="formList"
    :loading="loading"
    ref="formRef"
  />
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
      <span> 动态slot record:{{ record.salesName }} column: {{ column.id }}</span>
    </template>
    <template #address2="{ record, column }">
      <span > address1 record:{{ record.salesName }} column: {{ column.key }}</span>
    </template>
  </BaseTable>

  <BaseFormModal
    v-model="baseFormModalVisible"
    @formChange="formChange"
    @submit="modalSubmit"
    :loading="modalLoading"
    :confirm-loading="modalConfirmLoading"
    :data="formList"
    :cancel-text="`取消返回`"
    title="标题"
    ref="baseFormModalRef"
  />

  <BaseFormDrawer
    v-model="baseFormDrawerVisible"
    @submit="drawerSubmit"
    @click="drawerClick"
    @change="drawerChange"
    :data="baseFormDrawerList"
    :loading="drawerLoading"
    title="订单详情"
    ref="baseFormDrawerRef"
  >
    <template #custom="slotProps">
      <div class="custom">这是自定义元素 {{slotProps.data.city}}</div>
    </template>
  </BaseFormDrawer>
</template>

<script lang="ts" setup>
  import { ref, onMounted, reactive, watch } from "vue";

  import type { BaseTableInstance } from "@components/BaseTable";
  import type { BaseFormModalInstance, FormSearchInstance, DrawerClickDataType, DrawerChangeDataType } from "@types";

  import FormSearch from "@components/FormSearch/index.vue";
  import BaseTable from "@components/BaseTable/index.vue";
  import BaseFormDrawer from "@components/BaseFormDrawer/index.vue";
  import BaseFormModal from "@components/BaseFormModal/index.vue";
  import BaseForm from "@components/BaseForm/index.vue";

  import { formList, columns, tableHeaderBtns, createBaseFormDrawerList } from "./const";
  
  type Key = string | number;

  const formRef = ref<FormSearchInstance>();
  const baseFormRef = ref();
  const baseFormModalRef = ref<BaseFormModalInstance>()
  const tableRef = ref<BaseTableInstance>();
  const baseFormDrawerRef = ref();

  const loading = ref(false);
  const modalLoading = ref(false);
  const modalConfirmLoading = ref(false);
  const tableColumns = reactive(columns);
  const tableQueryParams = ref({});
  const refSelectedRowKeys = ref<Key[]>([])

  const baseFormDrawerList = ref(createBaseFormDrawerList());
  const baseFormDrawerVisible = ref(false);
  const baseFormModalVisible = ref(false);
  const drawerLoading = ref(false);

  const formChange = (key: string, value: any): void => {
    console.log("formChange",key, value);
    if (key === "age") {
      formRef.value!.setFormState({"address": "new-beij", userName: "陈禹廷", textarea: "描述新"})
    }
  }

  const onSelectChange = (selectedRowKeys: Key[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    refSelectedRowKeys.value = selectedRowKeys
  };

  watch(baseFormModalVisible, value => {
    console.log("baseFormModalVisible", baseFormModalVisible.value);
    
  })  

  onMounted(() => {
    console.log("FormSearchRef", formRef.value!.getFormState());
    const payload = formRef.value!.getFormState();
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


  const modalSubmit = (data: any) => {
    console.log("modalSubmit", data);
    if (data) {
      modalConfirmLoading.value = true;
      setTimeout(() => {
        modalConfirmLoading.value = false;
        baseFormModalVisible.value = false;
      }, 1000);
      
    }
  }

  const drawerSubmit = (submitData: any) => {
    console.log("submitData", submitData);
  }

  const tableClick = async (type: string, data: any) => {
    if(type === "changColumns") {
      tableColumns[2] = {
        title: "Full Name",
        width: 100,
        // dataIndex: 'name',
        key: "name",
      };
      console.log("FormSearchRef", formRef.value!.getFormState());
    }

    if (type === "add") {
      baseFormModalVisible.value = true;
      modalLoading.value = true;
      setTimeout(() => {
        modalLoading.value = false;
      }, 1500);
    }
    if (type === "export") {
      const res = await baseFormRef.value.submit();
      console.log("submit", res);
      
    }

    if (type === "edit") {
      drawerLoading.value = true;
      baseFormDrawerVisible.value = true;
      setTimeout(() => {
        drawerLoading.value = false;
      }, 2000);
    }
  }

  const drawerClick = async ({ key, value, panel }: DrawerClickDataType ) => {
    console.log("key, value", key, value);
    if (key === "userInfo" && value === "addUserInfo") {
      const data = await baseFormDrawerRef.value.submit(panel.ref);
      console.log("drawerClick data", data);
    }
  }

  const drawerChange = ({key, value, panel}: DrawerChangeDataType) => {
    console.log("key", key);
    console.log("value", value);
    console.log("panel", panel);
  }


</script>