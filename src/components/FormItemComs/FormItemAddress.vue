<template>
  <a-form-item
    v-bind="props.formItemProps"
    :name="props.name"
    :label="props.label"
    :rules="props.rules"
  >
    <a-input-group compact class="input-group-box">
      <!-- <a-input v-model:value="inputValue" v-bind="props.props"/> -->
      <a-select
        v-model:value="inputValue"
        @search="() => {}"
        :allowClear="false"
        :showSearch="true"
        :showArrow="false"
        :filter-option="false"
        :default-active-first-option="false"
        v-bind="props.props"
        class="select-box"
      >
        <a-select-option v-for="v in addressList || props?.props?.options" :key="v.id">
          {{ v.name + ` - (${v.address || ""})` }}
        </a-select-option>
      </a-select>
      <a-button @click="handClick">
        <template #icon><PlusOutlined /></template>
        {{ props?.props?.enterButton || "选择地址" }}
      </a-button>
    </a-input-group>
  </a-form-item>
</template>

<script lang="ts" setup>

  // props.props 详细参数请查阅官方文档 https://antdv.com/components/input-cn/#API
  import { ref, watch } from "vue";

  import { PlusOutlined } from "@ant-design/icons-vue";
  import type { FormItemProps as AntFormItemProps } from "ant-design-vue";
  import type { AnyPropName } from "@/types";

  import { useChange, useClick } from "./useFormItem";
  import { formItemDefaultProps } from "./const";
  
  interface FormItemEmits {
    (e: "update:modelValue", value: any): void,
    (e: "onChange", value: any, key: string): void,
    (e: "onClick", value: any, key: string): void
  }

  // vue3 当前版本暂不支持外部导入props类型定义 wait fix
  interface FormItemProps {
    modelValue: any, // v-model响应值
    name: string, // 数据键
    label: string, // 表单项文本名
    rules?: Array<AnyPropName>, // 校验规则 同antd 表单校验规则一致
    props?: AnyPropName, // 组件额外 props 同antd组件props一致
    formItemProps?: AntFormItemProps, // a-form-item props
    change?: (value: any, key: string) => void, // 当前项值变化时触发
  }
  
  const emits = defineEmits<FormItemEmits>();
  const props = withDefaults(defineProps<FormItemProps>(), {...formItemDefaultProps});

  const inputValue = ref(props.modelValue);

  watch(inputValue, value => {
    useChange(emits, props, value);
  })

  const addressList = ref<Array<any>>([]);
  watch(() => props.modelValue, value => {
    inputValue.value = value;
    addressList.value = addressList.value.concat([value]); // todo 未来可扩展直接搜索 @search
  })

  const handClick = () => {
    useClick(emits, props, inputValue.value);
  }
</script>

<style lang="less" scoped>
  .input-group-box{
    display: flex;
    flex-wrap: nowrap;
    .select-box{
      width: 100%;
    }
  }
</style>