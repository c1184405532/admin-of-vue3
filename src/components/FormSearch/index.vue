<template>
    <a-form
      ref="formRef"
      name="advanced_search"
      class="ant-advanced-search-form"
      :model="formState"
      @finish="onFinish"
    >
      <a-row :gutter="24">
        <template v-for="list in formList" :key="list.key">
          <a-col :span="8">
            <FormItemInput
              v-if="list.type === `input`"
              v-model="formState[list.key]"
              :name="list.key"
              :label="list.label"
              :rules="list.rules"
              :props="list.props"
            />
          </a-col>

        </template>
        
        <a-col :span="8">
          <a-form-item
            :name="`field1`"
            :label="`请输入年龄`"
            :rules="[{ required: true, message: 'input age' }]"
          >
            <a-input placeholder="请输入姓名" v-model:value="formState['field1']"></a-input>
          </a-form-item>
        </a-col>


        <!-- <template v-for="i in 10" :key="i">
          <a-col v-show="expand || i <= 6" :span="8">
            <a-form-item
              :name="`field-${i}`"
              :label="`field-${i}`"
              :rules="[{ required: true, message: 'input something' }]"
            >
              <a-input v-model:value="formState[`field-${i}`]" placeholder="placeholder"></a-input>
            </a-form-item>
          </a-col>
        </template> -->
      </a-row>
      <a-row>
        <a-col :span="24" style="text-align: right">
          <a-button type="primary" html-type="submit">Search</a-button>
          <a-button style="margin: 0 8px" @click="() => formRef?.resetFields()">Clear</a-button>
          <a style="font-size: 12px" @click="expand = !expand">
            <template v-if="expand">
              <UpOutlined />
            </template>
            <template v-else>
              <DownOutlined />
            </template>
            Collapse
          </a>
        </a-col>
      </a-row>
    </a-form>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch, onBeforeMount } from "vue";
  import type { FormInstance } from "ant-design-vue";
  import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";

  import FormItemInput from "./FormItemInput.vue";

  import { formList as FormList, FormListRowType, AnyPropName } from "./const";

  const expand = ref(false);
  const formRef = ref<FormInstance>();
  const formState = reactive<AnyPropName>({});
  const formList = reactive<Array<FormListRowType>>(FormList);



  watch(formState, (ov, nv) => {
    console.log("ov", ov);
    console.log("nv", nv);
  })

  onBeforeMount(() => {
    setDefaultFormState();
  })

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    console.log("formState: ", formState);
  };

  const setDefaultFormState = () => {
    formList.forEach(v => {
      formState[v.key] = v.defaultValue;
    }) 
  }
</script>