<template>
  <a-form-item
    v-bind="props.formItemProps"
    :name="props.name"
    :label="props.label"
    :rules="props.rules"
  >
    <a-select
      v-model:value="selectValue"
      :filterOption="filterOption"
      v-bind="props.props"
      :options="props.options"
    />
  </a-form-item>
</template>

<script lang="ts" setup>

  // props.props 详细参数请查阅官方文档 https://antdv.com/components/select-cn#API
  import { ref, watch } from "vue";

  import type { FormItemProps as AntFormItemProps } from "ant-design-vue";
  import type { AnyPropName } from "@/types";

  import { useChange } from "./useFormItem";
  import { formItemDefaultProps } from "./const";

  interface FormItemEmits {
    (e: "update:modelValue", value: any): void,
    (e: "onChange", value: any, key: string): void,
  }

  // vue3 当前版本暂不支持外部导入props类型定义 wait fix
  interface FormItemProps {
    modelValue: any, // v-model响应值
    name: string, // 数据键
    label: string, // 表单项文本名
    rules?: Array<AnyPropName>, // 校验规则 同antd 表单校验规则一致
    options?: Array<AnyPropName>, // 配置项数据 如 select 列表数据 tree-select 树下拉数据
    props?: AnyPropName, // 组件额外 props 同antd组件props一致
    formItemProps?: AntFormItemProps, // a-form-item props
    change?: (value: any, key: string) => void, // 当前项值变化时触发
  }
  
  const emits = defineEmits<FormItemEmits>();
  const props = withDefaults(defineProps<FormItemProps>(), {...formItemDefaultProps});

  const selectValue = ref(props.modelValue);

  watch(selectValue, value => {
    useChange(emits, props, value);
  })

  watch(() => props.modelValue, value => {
    selectValue.value = value;
  })

  // 如果是自定义options结构，此处搜索会失效，需要添加额外逻辑
  const filterOption = (input: string, option: any) => {
    const labelMatch = option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    const valueMatch = option?.value?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    return labelMatch || valueMatch;
  };
</script>