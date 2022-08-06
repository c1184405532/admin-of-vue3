<template>
    <a-form
      ref="formRef"
      name="advanced_search"
      class="ant-advanced-search-form"
      :model="formState"
      @finish="onFinish"
    >
      <a-row :gutter="24">
        <template v-for="(item, i) in formList" :key="item.key">
          <a-col :span="8" v-show="expand || i <= 6">
            <FormItemInput
              v-if="item.type === `input`"
              v-model="formState[item.key]"
              v-bind="item"
              :name="item.key"
            />
            <FormItemInputNumber
              v-if="item.type === `input-number`"
              v-model="formState[item.key]"
              v-bind="item"
              :name="item.key"
            />
            <FormItemTextArea
              v-if="item.type === `textarea`"
              v-model="formState[item.key]"
              v-bind="item"
              :name="item.key"
            />
            <FormItemSelect
              v-if="item.type === `select`"
              v-model="formState[item.key]"
              v-bind="item"
              :name="item.key"
            />
            <FormItemTreeSelect
              v-if="item.type === `tree-select`"
              v-model="formState[item.key]"
              v-bind="item"
              :name="item.key"
            />
            <FormItemDatePicker
              v-if="item.type === `date-picker`"
              v-model="formState[item.key]"
              v-bind="item"
              :name="item.key"
            />
          </a-col>

        </template>
        
        <!-- <a-col :span="8">
          <a-form-item
            :name="`field1`"
            :label="`请输入年龄`"
            :rules="[{ required: true, message: 'input age' }]"
          >
            <a-input placeholder="请输入姓名" v-model:value="formState['field1']"></a-input>
          </a-form-item>
        </a-col> -->


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
  import FormItemInputNumber from "./FormItemInputNumber.vue";
  import FormItemTextArea from "./FormItemTextArea.vue";
  import FormItemSelect from "./FormItemSelect.vue";
  import FormItemTreeSelect from "./FormItemTreeSelect.vue";
  import FormItemDatePicker from "./FormItemDatePicker.vue";

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
