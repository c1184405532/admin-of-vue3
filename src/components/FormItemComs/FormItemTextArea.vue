<template>
  <a-form-item
    :name="props.name"
    :label="props.label"
    :rules="props.rules"
  >
    <a-textarea
      v-model:value="inputValue"
      v-bind="props.props"
    />
  </a-form-item>
</template>

<script lang="ts" setup>

  // props.props 详细参数请查阅官方文档（TextArea） https://antdv.com/components/input-cn/#API
  import { ref, watch } from "vue";

  import { AnyPropName } from "@/types";

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
    props?: AnyPropName, // 组件额外 props 同antd组件props一致
    change?: (value: any, key: string) => void, // 当前项值变化时触发
  }
  
  const emits = defineEmits<FormItemEmits>();
  const props = withDefaults(defineProps<FormItemProps>(), {...formItemDefaultProps});

  const inputValue = ref(props.modelValue);

  watch(inputValue, value => {
    useChange(emits, props, value);
  })

  watch(() => props.modelValue, value => {
    inputValue.value = value;
  })
</script>